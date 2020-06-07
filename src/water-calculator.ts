import { PhValue, AlkalinityValue, ChlorideValue, SulfateValue, WaterHardnessValue, MagnesiumValue, CalciumValue, SodiumValue, VolumeValue, DensityValue, BeerColorValue, MassValue, BicarbonateValue, PercentValue, BitternessValue } from "./units";
import consts from "./consts";
import { saltIonMap, SaltIons, ionList, RecommendedIonLevels, RecommendedIonConcentrations  } from "./ions"; 
import { WaterTreatment } from "./water-treatment"; 
import { WaterProfile } from "./water-profile";
import SaltOptimizer from "./salt-optimizer";
import { Salt, Salts, SaltConcentrations, saltList } from "./salts";

/**
 * Type for water usage
 */
export type WaterUsage = "strike" | "sparge";

/**
 * Water profile calculator
 */
export default class WaterCalculator {

  private usage: WaterUsage = "strike";
  private assumedMgContributionToTestedGh = consts.ASSUMED_MG_CONTRIBUTION_TO_TESTED_GH;
  private maltRoastedPercent: PercentValue | null = null;
  private gh: WaterHardnessValue | null = null;
  private kh: WaterHardnessValue | null = null;
  private residualAlkalinity: AlkalinityValue | null = null;
  private alkalinity: AlkalinityValue | null = null;
  private waterVolume: VolumeValue = new VolumeValue("l", 0);
  private gristWeight: MassValue = new MassValue("kg", 0);
  private beerColor: BeerColorValue | null = null;  
  private bitterness: BitternessValue | null = null;
  private lacticAcid: VolumeValue | null = null;
  private phosphoricAcid: VolumeValue | null = null;
  private acidMalt: MassValue | null = null;
  private waterTreatment: WaterTreatment | null = null;

  private initialWaterProfile: WaterProfile = {
    calcium: null,
    magnesium: null,
    sodium: null,
    sulfate: null,
    chloride: null,
    bicarbonate: null
  };

  private salts: Salts = {
    bakingSoda: null,
    calciumChloride: null,
    chalkDissolved: null,
    chalkUndissolved: null,
    epsom: null,
    gypsum: null,
    magnesiumChloride: null,
    tableSalt: null
  };

  /**
   * Sets water usage
   * 
   * @param usage usage
   */
  public setUsage = (usage: WaterUsage) => {
    this.usage = usage;
  }

  /**
   * Returns water usage
   * 
   * @returns water usage
   */
  public getUsage = (): WaterUsage => {
    return this.usage;
  }
  
  /**
   * Returns GH
   * 
   * @returns GH or null if not set
   */
  public getGH = (): WaterHardnessValue | null => {
    return this.gh;
  }

  /**
   * Sets GH
   * 
   * @param value GH value
   */
  public setGH = (value: WaterHardnessValue | null) => {
    this.gh = value;
    this.estimateCalciumAndMagnesiumFromGh();
  } 

  /**
   * Returns KH
   * 
   * @returns KH or null if not set
   */
  public getKH = (): WaterHardnessValue => {
    return this.kh;
  }

  /**
   * Sets KH
   * 
   * @param value KH value
   */
  public setKH = (value: WaterHardnessValue | null) => {
    this.kh = value;
    
    if (value) {
      this.setAlkalinity(new AlkalinityValue("mg/l", value.getValue("ppmCaCO3")));
    }
  } 

  /**
   * Returns residual alkalinity
   * 
   * @returns residual alkalinity or null if not set
   */
  public getResidualAlkalinity = (): AlkalinityValue | null => {
    if (this.residualAlkalinity) {
      return this.residualAlkalinity;
    }

    const alkalinity = this.getAlkalinity();
    const calcium = this.getCalcium();
    const magnesium = this.getMagnesium();

    if (alkalinity == null || calcium == null || magnesium == null) {
      return null;
    }


    return new AlkalinityValue("dH", this.getAlkalinity().getValue("dH") - this.getCalcium().getValue("dH") / 3.5 - this.getMagnesium().getValue("dH") / 7);
  }

  /**
   * Sets residual alkalinity
   * 
   * @param value residual alkalinity value
   */
  public setResidualAlkalinity = (value: AlkalinityValue | null) => {
    this.residualAlkalinity = value;
  } 

  /**
   * Returns assumed MG contribution to tested gH
   * 
   * Defaults to 30 %
   * 
   * @returns assumed MG contribution to tested gH
   */
  public getAssumedMgContributionToTestedGh = () => {
    return this.assumedMgContributionToTestedGh;
  }

  /**
   * Sets the assumed MG contribution to tested gH
   * 
   * @param assumedMgContributionToTestedGh assumed MG contribution to tested gH
   */
  public setAssumedMgContributionToTestedGh = (assumedMgContributionToTestedGh: number) => {
    this.assumedMgContributionToTestedGh = assumedMgContributionToTestedGh;
    this.estimateCalciumAndMagnesiumFromGh();
  }

  /**
   * Returns malt roasted percent
   * 
   * The “roasted %” allows you to specify how much of the beer's color is contributed by roasted malts. 
   * E.g. if a beer is brewed with 90% 2-row, 7% 60 Lovibond cara malts and 3% 500 Lovibond roasted malts, 
   * the roasted malt portion of the color is 3%*500/(7%*60+3%*500)=78% (this neglects the color from the 2-row). 
   * 
   * @returns malt roasted percent
   */
  public getMaltRoastedPercent() {
    return this.maltRoastedPercent;
  }

  /**
   * Sets malt roasted percent
   * 
   * @returns malt roasted percent
   */
  public setMaltRoastedPercent(maltRoastedPercent: PercentValue | null) {
    this.maltRoastedPercent = maltRoastedPercent;
  }

  /**
   * Sets the water profile
   * 
   * @param waterProfile water profile
   */
  public setInitialWaterProfile = (waterProfile: WaterProfile) => {
    this.initialWaterProfile = waterProfile;
  }

  /**
   * Returns the water profile
   * 
   * @returns water profile
   */
  public getInitialWaterProfile = () => {
    return this.initialWaterProfile;
  }

  /**
   * Calculates salts to change water profile as close as possible to target water profile
   * 
   * @param targetWaterProfile target water profile
   * @param salts used salts
   * @returns optimize result
   */
  public optimizeSalts(targetWaterProfile: WaterProfile, salts: Salt[]) {
    const saltOptimizer = new SaltOptimizer(this, targetWaterProfile, salts);      
    return saltOptimizer.optimizeSalts();
  }

  /**
   * Calculates difference between two water profiles
   * 
   * @param waterProfile1 water profile 
   * @param waterProfile2 water profile that is compared agains waterProfile1
   * @returns difference between water profiles
   */
  public getWaterProfileDifference = (waterProfile1: WaterProfile, waterProfile2: WaterProfile): WaterProfile => {
    const result: WaterProfile = {
      bicarbonate: new BicarbonateValue("mg/l", waterProfile2.bicarbonate.getValue("mg/l")),
      calcium: new CalciumValue("mg/l", waterProfile2.calcium.getValue("mg/l")),
      chloride: new ChlorideValue("mg/l", waterProfile2.chloride.getValue("mg/l")),
      magnesium: new MagnesiumValue("mg/l", waterProfile2.magnesium.getValue("mg/l")),
      sodium: new SodiumValue("mg/l", waterProfile2.sodium.getValue("mg/l")),
      sulfate: new SulfateValue("mg/l", waterProfile2.sulfate.getValue("mg/l")),
    }

    ionList.forEach(ion => {
      result[ion].subValue(waterProfile1[ion]);
    });
    
    return result;
  }

  /**
   * Calculates water total error in mg/l between given water profile and current resulting water profile.
   * 
   * Method can be used for comparing different profiles but the value it self does not mean really anything
   * 
   * @param targetWaterProfile target water profile
   * @returns water total error in mg/l between given water profile and current resulting water profile.
   */
  public getWaterProfileTotalError = (targetWaterProfile: WaterProfile) => {
    const profileDifference = this.getWaterProfileDifference(this.getResultWaterProfile(), targetWaterProfile);
    return ionList.map(ion => profileDifference[ion]?.getValue("mg/l") || 0).reduce((a, b) => a + Math.abs(b));
  }

  /**
   * Returns whether given profile is in recommended levels water in calculator
   * 
   * @returns whether given profile is in recommended levels water in calculator
   */
  public getRecommendedIonLevels  = (waterProfile: WaterProfile): RecommendedIonLevels => {
    const result: Partial<RecommendedIonLevels> = {};
    const recommendedIonConcentrations  = this.getRecommendedIonConcentrations();

    ionList.forEach(ion => {
      const value = waterProfile[ion].getValue("mg/l");
      const harmful = (recommendedIonConcentrations[ion] as any)["harmful"]?.getValue("mg/l");
      const min = recommendedIonConcentrations[ion].min.getValue("mg/l");
      const max = recommendedIonConcentrations[ion].max.getValue("mg/l");
      
      if (harmful && value > harmful) {
        result[ion] = "harmful";
      } else if (value > max) {
        result[ion] = "toohigh";
      } else if (value < min) {
        result[ion] = "toolow";
      } else {
        result[ion] = "recommended";
      }
    });

    return result as RecommendedIonLevels;
  }

  /**
   * Returns recommended ion concentrations for water in calculator
   * 
   * @returns recommended ion concentrations for water in calculator
   */
  public getRecommendedIonConcentrations  = (): RecommendedIonConcentrations  => {
    const result = {
      calcium: {
        min: new CalciumValue("mg/l", 50),
        max: new CalciumValue("mg/l", 150)
      },
      magnesium: {
        min: new MagnesiumValue("mg/l", 10),
        max: new MagnesiumValue("mg/l", 30),
        harmful: new MagnesiumValue("mg/l", 125)
      },
      bicarbonate: {
        min: new BicarbonateValue("mg/l", 0),
        max: new BicarbonateValue("mg/l", 50)
      },
      sulfate: {
        min: new SulfateValue("mg/l", 50),
        max: new SulfateValue("mg/l", 150),
        harmful: new SulfateValue("mg/l", 750)
      },
      sodium: {
        min: new SodiumValue("mg/l", 0),
        max: new SodiumValue("mg/l", 150),
        harmful: new SulfateValue("mg/l", 0)
      },
      chloride: {
        min: new ChlorideValue("mg/l", 0),
        max: new ChlorideValue("mg/l", 250)
      }
    };

    const srm = this.getBeerColor()?.getValue("SRM") || 0;
    const ibu = this.getBitterness()?.getValue("IBU") || 0;
    
    if (srm >= 9) {
      result.bicarbonate.min.setValue("mg/l", 50);
      result.bicarbonate.max.setValue("mg/l", 150);
    } else if (srm >= 20) {
      result.bicarbonate.min.setValue("mg/l", 150);
      result.bicarbonate.max.setValue("mg/l", 250);
    }

    if (ibu >= 40) {
      result.sulfate.min.setValue("mg/l", 150);
      result.sulfate.max.setValue("mg/l", 350);
    }

    return result;    
  }
  
  /**
   * Returns calcium
   * 
   * @returns calcium or null if not set
   */
  public getCalcium = (): CalciumValue | null => {
    return this.initialWaterProfile.calcium;
  }

  /**
   * Sets calcium
   * 
   * @param value calcium value
   */
  public setCalcium = (value: CalciumValue | null) => {
    this.initialWaterProfile.calcium = value;
  } 

  /**
   * Returns magnesium
   * 
   * @returns magnesium or null if not set
   */
  public getMagnesium = (): MagnesiumValue | null => {
    return this.initialWaterProfile.magnesium;
  }

  /**
   * Sets magnesium
   * 
   * @param value magnesium value
   */
  public setMagnesium = (value: MagnesiumValue | null) => {
    this.initialWaterProfile.magnesium = value;
  } 
    
  /**
   * Returns sodium
   * 
   * @returns sodium or null if not set
   */
  public getSodium = (): SodiumValue | null => {
    return this.initialWaterProfile.sodium;
  }

  /**
   * Sets sodium
   * 
   * @param value sodium value
   */
  public setSodium = (value: SodiumValue | null) => {
    this.initialWaterProfile.sodium = value;
  } 

  /**
   * Returns sulfate
   * 
   * @returns sulfate or null if not set
   */
  public getSulfate = (): SulfateValue | null => {
    return this.initialWaterProfile.sulfate;
  }

  /**
   * Sets sulfate
   * 
   * @param value sulfate value
   */
  public setSulfate = (value: SulfateValue | null) => {
    this.initialWaterProfile.sulfate = value;
  } 

  /**
   * Returns chloride
   * 
   * @returns chloride or null if not set
   */
  public getChloride = (): ChlorideValue | null => {
    return this.initialWaterProfile.chloride;
  }

  /**
   * Sets chloride
   * 
   * @param value chloride value
   */
  public setChloride = (value: ChlorideValue | null) => {
    this.initialWaterProfile.chloride = value;
  } 

  /**
   * Returns bicarbonate
   * 
   * @returns bicarbonate or null if not set
   */
  public getBicarbonate = (): BicarbonateValue | null => {
    if (this.initialWaterProfile.bicarbonate) {
      return this.initialWaterProfile.bicarbonate;
    }

    const alkalinity = this.getAlkalinity();
    if (alkalinity) {
      return new BicarbonateValue("mg/l", alkalinity.getValue("mg/l") * 61 / 50);
    }

    return null;
  }

  /**
   * Sets bicarbonate
   * 
   * @param value bicarbonate value
   */
  public setBicarbonate = (value: BicarbonateValue | null) => {
    this.initialWaterProfile.bicarbonate = value;
  } 

  /**
   * Returns alkalinity either from given alkalinity value or 
   * value derived from given bicarbonate value
   * 
   * @returns alkalinity or null if not set
   */
  public getAlkalinity = (): AlkalinityValue | null => {
    if (this.alkalinity != null) {
      return this.alkalinity;
    }

    if (this.initialWaterProfile.bicarbonate != null) {
      return new AlkalinityValue("mg/l", this.initialWaterProfile.bicarbonate.getValue("mg/l") * 50 / 61);
    }

    return null;
  }

  /**
   * Sets alkalinity
   * 
   * @param value alkalinity value
   */
  public setAlkalinity = (value: AlkalinityValue | null) => {
    this.alkalinity = value;
  } 

  /**
   * Returns water volume
   * 
   * @returns water volume or null if not set
   */
  public getWaterVolume = (): VolumeValue => {
    return this.waterVolume;
  }

  /**
   * Sets water volume
   * 
   * @param value water value
   */
  public setWaterVolume = (value: VolumeValue) => {
    this.waterVolume = value;
  } 

  /**
   * Returns grist weight
   * 
   * @returns grist weight or null if not set
   */
  public getGristWeight = (): MassValue => {
    return this.gristWeight;
  }

  /**
   * Sets grist weight
   * 
   * @param value grist weight value
   */
  public setGristWeight = (value: MassValue) => {
    this.gristWeight = value;
  }

  /**
   * Returns beer color
   * 
   * @returns beer color or null if not set
   */
  public getBeerColor = (): BeerColorValue | null => {
    return this.beerColor;
  }

  /**
   * Sets beer color
   * 
   * @param value beer color value
   */
  public setBeerColor = (value: BeerColorValue | null) => {
    this.beerColor = value;
  }

  /**
   * Returns bitterness
   * 
   * @returns bitterness or null if not set
   */
  public getBitterness = (): BitternessValue | null => {
    return this.bitterness;
  }

  /**
   * Sets bitterness
   * 
   * @param value bitterness value
   */
  public setBitterness = (value: BitternessValue | null) => {
    this.bitterness = value;
  }

  /**
   * Returns mash thickness. Method should be used only when calculating strike water
   * 
   * @returns mash thickness
   */
  public getMashThickness = () => {
    if (this.getUsage() == "sparge") {
      return null;
    }

    const waterVolume = this.getWaterVolume().getValue("l");
    const gristWeight = this.getGristWeight().getValue("kg");
    return new DensityValue("l/kg", gristWeight == 0 || gristWeight == 0 ? 0 : waterVolume / gristWeight);
  }
  
  /**
   * Sets salts from salt concentrations
   * 
   * @param saltConcentrations salt concentrations
   */
  public setSaltConcentrations = (saltConcentrations: SaltConcentrations) => {
    const waterVolume = this.getWaterVolume();
    const salts: Partial<Salts> = {};

    saltList.forEach(salt => {
      salts[salt] = saltConcentrations[salt]?.getMass(waterVolume)
    });

    this.setSalts(salts as Salts);
  }

  /**
   * Sets salts
   * 
   * @param salts
   */
  public setSalts = (salts: Salts) => {
    this.salts = salts;
  }

  /**
   * Returns salts
   * 
   * @returns salts
   */
  public getSalts = () => {
    return this.salts;
  }

  /**
   * Returns gypsum
   * 
   * @returns gypsum or null if not set
   */
  public getGypsum = (): MassValue | null => {
    return this.salts.gypsum;
  }

  /**
   * Sets gypsum
   * 
   * @param value gypsum value
   */
  public setGypsum = (value: MassValue | null) => {
    this.salts.gypsum = value;
  }

  /**
   * Returns epsom
   * 
   * @returns epsom or null if not set
   */
  public getEpsom = (): MassValue | null => {
    return this.salts.epsom;
  }

  /**
   * Sets epsom
   * 
   * @param value epsom value
   */
  public setEpsom = (value: MassValue | null) => {
    this.salts.epsom = value;
  } 

  /**
   * Returns tablesalt
   * 
   * @returns tablesalt or null if not set
   */
  public getTableSalt = (): MassValue | null => {
    return this.salts.tableSalt;
  }

  /**
   * Sets tablesalt
   * 
   * @param value tablesalt value
   */
  public setTableSalt = (value: MassValue | null) => {
    this.salts.tableSalt = value;
  } 

  /**
   * Returns bakingsoda
   * 
   * @returns bakingsoda or null if not set
   */
  public getBakingSoda = (): MassValue | null => {
    return this.salts.bakingSoda;
  }

  /**
   * Sets bakingsoda
   * 
   * @param value bakingsoda value
   */
  public setBakingSoda = (value: MassValue | null) => {
    this.salts.bakingSoda = value;
  } 

  /**
   * Returns magnesiumchloride
   * 
   * @returns magnesiumchloride or null if not set
   */
  public getMagnesiumChloride = (): MassValue | null => {
    return this.salts.magnesiumChloride;
  }

  /**
   * Sets magnesiumchloride
   * 
   * @param value magnesiumchloride value
   */
  public setMagnesiumChloride = (value: MassValue | null) => {
    this.salts.magnesiumChloride = value;
  } 

  /**
   * Returns calciumchloride
   * 
   * @returns calciumchloride or null if not set
   */
  public getCalciumChloride = (): MassValue | null => {
    return this.salts.calciumChloride;
  }

  /**
   * Sets calciumchloride
   * 
   * @param value calciumchloride value
   */
  public setCalciumChloride = (value: MassValue | null) => {
    this.salts.calciumChloride = value;
  } 

  /**
   * Returns undissolved chalk
   * 
   * @returns undissolved chalk or null if not set
   */
  public getChalkUndissolved = (): MassValue | null => {
    return this.salts.chalkUndissolved;
  }

  /**
   * Sets undissolved chalk
   * 
   * @param value undissolved chalk value
   */
  public setChalkUndissolved = (value: MassValue | null) => {
    this.salts.chalkUndissolved = value;
  } 

  /**
   * Returns dissolved chalk
   * 
   * @returns dissolved chalk or null if not set
   */
  public getChalkDissolved = (): MassValue | null => {
    return this.salts.chalkDissolved;
  }

  /**
   * Sets dissolved chalk
   * 
   * @param value dissolved chalk value
   */
  public setChalkDissolved = (value: MassValue | null) => {
    this.salts.chalkDissolved = value;
  } 

  /**
   * Returns lactic acid
   * 
   * @param strength returned lactic acid strength as percents. Defaults to 88 %
   * @returns lactic acid or null if not set
   */
  public getLacticAcid = (strength?: number | PercentValue): VolumeValue => {
    const strengthPercent = strength instanceof PercentValue ? strength.getValue("%") : strength || 88;
    return this.convertVolumeToStrength(this.lacticAcid, 88, strengthPercent);
  }

  /**
   * Sets lactic acid
   * 
   * @param value lactic acid value
   * @param strength lactic acid strength as percents. Defaults to 88 %
   */
  public setLacticAcid = (value: VolumeValue | null, strength?: number | PercentValue) => {
    const strengthPercent = strength instanceof PercentValue ? strength.getValue("%") : strength || 88;
    this.lacticAcid = this.convertVolumeToStrength(value, strengthPercent, 88);
  }

  /**
   * Returns phosphoric acid
   * 
   * @param strength returned phosphoric acid strength as percents. Defaults to 10 %
   * @returns phosphoric acid or null if not set
   */
  public getPhosphoricAcid = (strength?: number | PercentValue): VolumeValue => {
    const strengthPercent = strength instanceof PercentValue ? strength.getValue("%") : strength || 10;
    return this.convertVolumeToStrength(this.phosphoricAcid, 10, strengthPercent);
  }

  /**
   * Sets phosphoric acid
   * 
   * @param value phosphoric acid value
   * @param strength phosphoric acid strength as percents. Defaults to 10 %
   */
  public setPhosphoricAcid = (value: VolumeValue | null, strength?: number | PercentValue) => {
    const strengthPercent = strength instanceof PercentValue ? strength.getValue("%") : strength || 10;
    this.phosphoricAcid = this.convertVolumeToStrength(value, strengthPercent, 10);
  }

  /**
   * Returns acid malt
   * 
   * @param strength returned acid malt strength as percents. Defaults to 3 %
   * @returns acid malt or null if not set
   */
  public getAcidMalt = (strength?: number | PercentValue): MassValue => {
    const strengthPercent = strength instanceof PercentValue ? strength.getValue("%") : strength || 3;
    return this.convertMassToStrength(this.acidMalt, 3, strengthPercent);
  }

  /**
   * Sets acid malt
   * 
   * @param value acid malt value
   * @param strength acid malt strength as percents. Defaults to 3 %
   */
  public setAcidMalt = (value: MassValue | null, strength?: number | PercentValue) => {
    const strengthPercent = strength instanceof PercentValue ? strength.getValue("%") : strength || 3;
    this.acidMalt = this.convertMassToStrength(value, strengthPercent, 3);
  }
  
  /**
   * Returns water ion mass concentrations after added salts
   * 
   * @returns water ion mass concentrations after added salts
   */
  public getResultWaterProfile(): WaterProfile {
    const result = this.getWaterProfileChanges();
    
    result.calcium.add("mg/l", (this.getCalcium()?.getValue("mg/l")) || 0);
    result.chloride.add("mg/l", (this.getChloride()?.getValue("mg/l")) || 0);
    result.magnesium.add("mg/l", (this.getMagnesium()?.getValue("mg/l")) || 0);
    result.sodium.add("mg/l", (this.getSodium()?.getValue("mg/l")) || 0);
    result.sulfate.add("mg/l", (this.getSulfate()?.getValue("mg/l")) || 0);
    result.bicarbonate.add("mg/l", (this.getBicarbonate()?.getValue("mg/l")) || 0);

    return result;
  }

  /**
   * Returns water ion mass concentration changes caused by added salts
   * 
   * @returns water ion mass concentration changes caused by added salts
   */
  public getWaterProfileChanges(): WaterProfile {
    const result: WaterProfile = {
      calcium: new CalciumValue("mg/l", 0),
      chloride: new ChlorideValue("mg/l", 0),
      magnesium: new MagnesiumValue("mg/l", 0),
      sodium: new SodiumValue("mg/l", 0),
      sulfate: new SulfateValue("mg/l", 0),
      bicarbonate: new BicarbonateValue("mg/l", 0)
    };

    const waterVolume = this.getWaterVolume();
    if (waterVolume && waterVolume.getValue("l") > 0) {
      this.addSaltIonChanges(result, waterVolume, this.salts.gypsum, saltIonMap.gypsum);
      this.addSaltIonChanges(result, waterVolume, this.salts.epsom, saltIonMap.epsom);
      this.addSaltIonChanges(result, waterVolume, this.salts.tableSalt, saltIonMap.tableSalt);
      this.addSaltIonChanges(result, waterVolume, this.salts.calciumChloride, saltIonMap.calciumChloride);
      this.addSaltIonChanges(result, waterVolume, this.salts.magnesiumChloride, saltIonMap.magnesiumChloride);
      this.addSaltIonChanges(result, waterVolume, this.salts.bakingSoda, saltIonMap.bakingSoda);
      this.addSaltIonChanges(result, waterVolume, this.salts.chalkUndissolved, saltIonMap.chalkUndissolved);
      this.addSaltIonChanges(result, waterVolume, this.salts.chalkDissolved, saltIonMap.chalkDissolved);
    }

    return result;
  }

  /**
   * Returns ion balance. 
   * 
   * Ion balance gives the ion balance in %. Ideally it should be 0 (i.e. there are as many equivalents of cations as there are anions) 
   * but if the water contains a substantial amount of ions that are not listed here (i.e. Potassium or Phosphates), the ions may not add up
   * 
   * @returns ion balance
   */
  public getIonBalance(): number {
    const calciumDh = this.getCalcium()?.getValue("dH") || 0;
    const magnesiumDh = this.getMagnesium()?.getValue("dH") || 0;
    const sodiumDh = this.getSodium()?.getValue("dH") || 0;
    const sulfateDh = this.getSulfate()?.getValue("dH") || 0;
    const chlorideDh = this.getChloride()?.getValue("dH") || 0;
    const alkalinityDh = this.getAlkalinity().getValue("dH");

    const ionDhs = calciumDh + magnesiumDh + sodiumDh + sulfateDh + chlorideDh + alkalinityDh;
    if (ionDhs == 0) {
      return 0;
    }

    return (calciumDh + magnesiumDh + sodiumDh - sulfateDh - chlorideDh - alkalinityDh) / ionDhs * 50;
  }

  /**
   * Estimates distilled water mash pH at 25 C / 77 F using beer color and roasted percent
   * 
   * @return Estimated distilled water mash pH at 25 C
   */
  public getEstimatedDistilledWaterMashPh = (): PhValue | null => {
    const beerColor = this.getBeerColor();
    if (!beerColor) {
      return null;
    }

    const ph0Srm = 5.6;
    const sC = 0.21;
    const sR = 0.06;
    const p = 12;    
    const srm = beerColor.getValue("SRM");
    const r = this.getMaltRoastedPercent().getValue("%") / 100;
    return new PhValue("pH", ph0Srm - srm * (sC * (1 - r) + sR * r) / p);
  }

  /**
   * Calculates mash pH change from acid additions
   * 
   * @returns mash pH change from acid additions
   */
  public getMashPhChangeFromAcidAdditions = (): PhValue => {
    return new PhValue("pH", this.getMashPhChangeFromPhosporicAcid() + this.getMashPhChangeFromLacticAcid() + this.getMashPhChangeFromAcidMalt());
  }

  /**
   * Calculates mash pH change from salt additions. Method returns always zero change when using sparge water
   * 
   * @returns mash pH change from salt additions
   */
  public getPhChangeFromSalts = (): PhValue | null => {
    const gristWeight = this.getGristWeight();
    const totalResidualAlkalinityFromSalts = this.getTotalResidualAlkalinityFromSalts().getValue("mEq/l");
    return new PhValue("pH", totalResidualAlkalinityFromSalts / consts.MASH_BUFFER_CAPACITY_FOR_WATER_RESIDUAL_ALKALINITY / gristWeight.getValue("kg"));
  }

  /**
   * Returns total residual alkalinity from salts. Method returns always zero when using sparge water
   * 
   * @returns total residual alkalinity from salts
   */
  public getTotalResidualAlkalinityFromSalts = (): AlkalinityValue => {
    if (this.getUsage() == "sparge") {
      return new AlkalinityValue("mEq/l", 0);
    }

    const waterVolume = this.getWaterVolume();
    const resultWaterProfile = this.getResultWaterProfile();

    const calcium = resultWaterProfile.calcium.subValue(this.getCalcium());
    const magnesium = resultWaterProfile.magnesium.subValue(this.getMagnesium());
    const bicarbonate = resultWaterProfile.bicarbonate.subValue(this.getBicarbonate());

    const caHardnessFromSalts = (calcium.getValue("mg/l") || 0) / 20;
    const mgHardnessFromSalts = (magnesium.getValue("mg/l") || 0) / 12.15;
    const alkalinityFromSalts = (bicarbonate.getValue("mg/l") || 0) / 61;

    const residualAlkalinityFromSalts = alkalinityFromSalts - caHardnessFromSalts / 3.5 - mgHardnessFromSalts / 7
    const totalResidualAlkalinityFromSalts = residualAlkalinityFromSalts * waterVolume.getValue("l");

    return new AlkalinityValue("mEq/l", totalResidualAlkalinityFromSalts);
  }

  /**
   * Sets used water treatment method
   * 
   * @param waterTreatment water treatment method
   */
  public setWaterTreatment(waterTreatment: WaterTreatment | null) {
    this.waterTreatment = waterTreatment;
    if (this.waterTreatment) {
      this.waterTreatment.init(this);
    }
  }

  /**
   * Returns used water treatment method instance
   * 
   * @return used water treatment method instance
   */
  public getWaterTreatment = (): WaterTreatment | null => {
    return this.waterTreatment;
  }

  /**
   * Returns pH change after water treatment and salt additions
   * 
   * @returns pH change after water treatment and salt additions
   */
  public getWaterTreatmentPhChange = (): PhValue | null => {
    if (this.waterTreatment) {
      return this.waterTreatment.getPhChange();
    }

    return null;
  }

  /**
   * Returns pH change from base water. Method should be used only for strike water.
   * 
   * @returns pH change from base water
   */
  public getPhChangeFromBaseWater = (): PhValue | null => {
    if (this.getUsage() == "sparge") {
      return null;
    }

    const strikeWater = this.getWaterVolume();
    const gristWeight = this.getGristWeight();
    const residualAlkalinity = this.getResidualAlkalinity();
    if (!strikeWater || !gristWeight || !residualAlkalinity) {
      return null;
    }

    const totalResidualAlkalinityInBaseMashWater = (strikeWater.getValue("l") * residualAlkalinity.getValue("mg/l")) / 50;
    return new PhValue("pH", totalResidualAlkalinityInBaseMashWater / gristWeight.getValue("kg") / consts.MASH_BUFFER_CAPACITY_FOR_WATER_RESIDUAL_ALKALINITY);
  }

  /**
   * Returns pH change after water treatment and salt and acid additions
   * 
   * @returns pH change after water treatment and salt and acid additions
   */
  public getOverallPhChange = (): PhValue | null => {
    const result = this.getPhChangeFromBaseWater();

    if (result) {
      if (this.waterTreatment) {
        result.addValue(this.waterTreatment?.getPhChange());
      } else {
        result.addValue(this.getPhChangeFromSalts());
      }

      result.addValue(this.getMashPhChangeFromAcidAdditions());
    }

    return result;
  }

  /**
   * Returns whether salt is an alkaline mineral
   * 
   * @param salt salt
   * @returns whether salt is an alkaline mineral
   */
  public isAlkalineMineral(salt: Salt) {
    return saltIonMap[salt].bicarbonate && saltIonMap[salt].bicarbonate.getValue("mg/l") > 0;
  }

  /**
   * Calculates mash pH change from acid malt
   * 
   * @returns mash pH change from acid malt
   */
  private getMashPhChangeFromAcidMalt = () => {
    const lacticAcidFromAcidMalt = this.getAcidMalt(100)?.getValue("g") || 0;
    const totalLacticAcidWeight = new MassValue("g", lacticAcidFromAcidMalt);
    return this.getMashPhChangeFromLacticAcidWeight(totalLacticAcidWeight);
  }

  /**
   * Calculates required amount of lactic acid to lower pH by given amount.
   * 
   * If pH delta is positive, returned amount will be 0 
   * 
   * @param phDelta required delta of pH
   * @returns required amount of lactic acid to lower pH by given amount.
   */
  public getRequiredLacticAcidForPhChange(phDelta: PhValue): VolumeValue {
    if (phDelta.getValue("pH") >= 0) {
      return new VolumeValue("ml", 0);  
    }

    const lacticAcidStrength = 88;
    return new VolumeValue("μl", -phDelta.getValue("pH") * this.getGristWeight().getValue("kg") * consts.MASH_BUFFER_CAPACITY_FOR_ACID_ADDITIONS * consts.LACTIC_ACID_MOLAR_WEIGHT * 100 / lacticAcidStrength / consts.LACTIC_ACID_DENSITY_88);
  }

  /**
   * Calculates required amount of phosphoric acid to lower pH by given amount.
   * 
   * If pH delta is positive, returned amount will be 0 
   * 
   * @param phDelta required delta of pH
   * @returns required amount of phosphoric acid to lower pH by given amount.
   */
  public getRequiredPhosporicAcidForPhChange(phDelta: PhValue): VolumeValue {
    if (phDelta.getValue("pH") >= 0) {
      return new VolumeValue("ml", 0);  
    }

    const phosphoricAcidStrength = 10;
    return new VolumeValue("μl", phDelta.getValue("pH") * this.getGristWeight().getValue("kg") * consts.MASH_BUFFER_CAPACITY_FOR_ACID_ADDITIONS * consts.PHOSPHORIC_ACID_MOLECULAR_WEIGHT * 100 / -phosphoricAcidStrength / (phosphoricAcidStrength / 85 * (consts.PHOSPHORIC_ACID_DENSITY_85 - 1) + 1));
  }

  /**
   * Calculates mash pH change from lacic acid
   * 
   * @returns mash pH change from lacic acid
   */
  private getMashPhChangeFromLacticAcid = () => {
    const lacticAcidStrength = 88;
    const totalLacticAcidWeight = (this.getLacticAcid(lacticAcidStrength)?.getValue("ml") || 0) * consts.LACTIC_ACID_DENSITY_88 * (lacticAcidStrength / 100);
    return this.getMashPhChangeFromLacticAcidWeight(new MassValue("g", totalLacticAcidWeight));
  }

  /**
   * Calculates mash pH change from weight of 100% lacic acid
   * 
   * @returns mash pH change from weight of 100% lacic acid
   */
  private getMashPhChangeFromLacticAcidWeight = (totalLacticAcidWeight: MassValue) => {
    const totalAcidMaltPower = totalLacticAcidWeight.getValue("mg") / consts.LACTIC_ACID_MOLAR_WEIGHT;
    return -totalAcidMaltPower / consts.MASH_BUFFER_CAPACITY_FOR_ACID_ADDITIONS / this.getGristWeight().getValue("kg");
  }

  /**
   * Calculates mash pH change from phosporic acid
   * 
   * @returns mash pH change from phosporic acid
   */
  private getMashPhChangeFromPhosporicAcid = () => {
    const phosphoricAcidStrength = 10;
    const phosphoricAcidDensity = phosphoricAcidStrength / 85 * (consts.PHOSPHORIC_ACID_DENSITY_85 - 1) + 1;
    const phosporicAcidSolutionWeight = new MassValue("g", (this.getPhosphoricAcid(phosphoricAcidStrength)?.getValue("ml") || 0) * phosphoricAcidDensity);
    const phosphoricAcidFromLiquidPhosphoricAcid = phosphoricAcidStrength / 100 * phosporicAcidSolutionWeight.getValue("mg");
    const phosphoricAcidPower = phosphoricAcidFromLiquidPhosphoricAcid / consts.PHOSPHORIC_ACID_MOLECULAR_WEIGHT;
    return -phosphoricAcidPower / consts.MASH_BUFFER_CAPACITY_FOR_ACID_ADDITIONS / this.getGristWeight().getValue("kg");
  }

  /**
   * Converts volume value from given from strength to given to strength
   * 
   * e.g. from 88% lactic acid to 85% lactic acid
   * 
   * @param value value
   * @param fromStrength initial strength 
   * @param toStrength target strength
   * @returns converted volume value
   */
  private convertVolumeToStrength(value: VolumeValue | null, fromStrength: number, toStrength: number) {
    if (!value || !fromStrength || !toStrength) {
      return value;
    }

    return new VolumeValue("ml", value.getValue("ml") / (toStrength / fromStrength));
  }
  
  /**
   * Converts mass value from given from strength to given to strength
   * 
   * e.g. from 3% acid malt to 2% acid malt
   * 
   * @param value value
   * @param fromStrength initial strength 
   * @param toStrength target strength
   * @returns converted volume value
   */
  private convertMassToStrength(value: MassValue| null, fromStrength: number, toStrength: number) {
    if (!value || !fromStrength || !toStrength) {
      return value;
    }

    return new MassValue("g", value.getValue("g") / (toStrength / fromStrength));
  }

  /**
   * Estimates amount of calcium and magnesium from GH
   */
  private estimateCalciumAndMagnesiumFromGh = () => {
    if (this.gh == null) {
      return;
    }

    this.setCalcium(new CalciumValue("mg/l", this.gh.getValue("ppmCaCO3") * (1 - this.assumedMgContributionToTestedGh / 100) / 17.8 * 7.14));
    this.setMagnesium(new MagnesiumValue("mg/l", this.gh.getValue("ppmCaCO3") * (this.assumedMgContributionToTestedGh / 100) / 17.8 * 4.33));
  }

  /**
   * Adds ion changes by given salt 
   * 
   * @param result resulting ions
   * @param waterVolume volume of water where changes take place
   * @param salt amount of salt
   * @param saltIons salt ion properties
   */
  private addSaltIonChanges(result: WaterProfile, waterVolume: VolumeValue, salt: MassValue | undefined, saltIons: SaltIons) {
    if (salt) {
      const saltConcentration = salt.getMassConcentration(waterVolume).getValue("mg/l");
      result.calcium.add("mg/l", saltConcentration * (saltIons.calcium?.getValue("mg/l") || 0));
      result.chloride.add("mg/l", saltConcentration * (saltIons.chloride?.getValue("mg/l") || 0));
      result.magnesium.add("mg/l", saltConcentration * (saltIons.magnesium?.getValue("mg/l") || 0));
      result.sodium.add("mg/l", saltConcentration * (saltIons.sodium?.getValue("mg/l") || 0));
      result.sulfate.add("mg/l", saltConcentration * (saltIons.sulfate?.getValue("mg/l") || 0));
      result.bicarbonate.add("mg/l", saltConcentration * (saltIons.bicarbonate?.getValue("mg/l") || 0));
    }
  }

}