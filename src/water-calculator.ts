import { PhValue, AlkalinityValue, ChlorideValue, SulfateValue, WaterHardnessValue, MagnesiumValue, CalciumValue, SodiumValue, VolumeValue, DensityValue, BeerColorValue, MassValue, BicarbonateValue, PercentValue } from "./units";
import consts from "./consts";
import { saltIonMap, SaltIons } from "./ions"; 
import { WaterTreatment } from "./water-treatment"; 
import { WaterProfile } from "./water-profile";
import SaltOptimizer from "./salt-optimizer";
import { Salt } from "./salts";

/**
 * Water profile calculator
 */
export default class WaterCalculator {

  private assumedMgContributionToTestedGh = consts.ASSUMED_MG_CONTRIBUTION_TO_TESTED_GH;
  private maltRoastedPercent: PercentValue | null = null;
  private gh: WaterHardnessValue | null = null;
  private kh: WaterHardnessValue | null = null;
  private residualAlkalinity: AlkalinityValue | null = null;
  private alkalinity: AlkalinityValue | null = null;
  private strikeWater: VolumeValue = new VolumeValue("l", 0);
  private spargeWater: VolumeValue = new VolumeValue("l", 0);
  private gristWeight: MassValue = new MassValue("kg", 0);
  private beerColor: BeerColorValue | null = null;
  
  private gypsum: MassValue | null = null;
  private epsom: MassValue | null = null;
  private tableSalt: MassValue | null = null;
  private calciumChloride: MassValue | null = null;
  private magnesiumChloride: MassValue | null = null;
  private bakingSoda: MassValue | null = null;
  private chalkUndissolved: MassValue | null = null;
  private chalkDissolved: MassValue | null = null;

  private lacticAcid: VolumeValue | null = null;
  private phosphoricAcid: VolumeValue | null = null;
  private acidMalt: MassValue | null = null;
  private waterTreatment: WaterTreatment | null = null;
  private waterProfile: WaterProfile = {
    calcium: null,
    magnesium: null,
    sodium: null,
    sulfate: null,
    chloride: null,
    bicarbonate: null
  };
  
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
  public setWaterProfile = (waterProfile: WaterProfile) => {
    this.waterProfile = waterProfile;
  }

  /**
   * Returns the water profile
   * 
   * @returns water profile
   */
  public getWaterProfile = () => {
    return this.waterProfile;
  }

  /**
   * Calculates salts to change water profile as close as possible to target water profile
   * 
   * @param targetWaterProfile target water profile
   * @param targetResidualAlkalinity target residual alkalinity
   * @param salts used salts
   * @returns optimize result
   */
  public optimizeSalts(targetWaterProfile: WaterProfile, targetResidualAlkalinity: AlkalinityValue, salts: Salt[]) {
    const saltOptimizer = new SaltOptimizer(this.getWaterProfile(), 
      targetWaterProfile, 
      targetResidualAlkalinity,
      this.getStrikeWater(),
      this.getSpargeWater(),
      salts);
      
    return saltOptimizer.optimizeSalts();
  }

  /**
   * Returns calcium
   * 
   * @returns calcium or null if not set
   */
  public getCalcium = (): CalciumValue | null => {
    return this.waterProfile.calcium;
  }

  /**
   * Sets calcium
   * 
   * @param value calcium value
   */
  public setCalcium = (value: CalciumValue | null) => {
    this.waterProfile.calcium = value;
  } 

  /**
   * Returns magnesium
   * 
   * @returns magnesium or null if not set
   */
  public getMagnesium = (): MagnesiumValue | null => {
    return this.waterProfile.magnesium;
  }

  /**
   * Sets magnesium
   * 
   * @param value magnesium value
   */
  public setMagnesium = (value: MagnesiumValue | null) => {
    this.waterProfile.magnesium = value;
  } 
    
  /**
   * Returns sodium
   * 
   * @returns sodium or null if not set
   */
  public getSodium = (): SodiumValue | null => {
    return this.waterProfile.sodium;
  }

  /**
   * Sets sodium
   * 
   * @param value sodium value
   */
  public setSodium = (value: SodiumValue | null) => {
    this.waterProfile.sodium = value;
  } 

  /**
   * Returns sulfate
   * 
   * @returns sulfate or null if not set
   */
  public getSulfate = (): SulfateValue | null => {
    return this.waterProfile.sulfate;
  }

  /**
   * Sets sulfate
   * 
   * @param value sulfate value
   */
  public setSulfate = (value: SulfateValue | null) => {
    this.waterProfile.sulfate = value;
  } 

  /**
   * Returns chloride
   * 
   * @returns chloride or null if not set
   */
  public getChloride = (): ChlorideValue | null => {
    return this.waterProfile.chloride;
  }

  /**
   * Sets chloride
   * 
   * @param value chloride value
   */
  public setChloride = (value: ChlorideValue | null) => {
    this.waterProfile.chloride = value;
  } 

  /**
   * Returns bicarbonate
   * 
   * @returns bicarbonate or null if not set
   */
  public getBicarbonate = (): BicarbonateValue | null => {
    if (this.waterProfile.bicarbonate) {
      return this.waterProfile.bicarbonate;
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
    this.waterProfile.bicarbonate = value;
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

    if (this.waterProfile.bicarbonate != null) {
      return new AlkalinityValue("mg/l", this.waterProfile.bicarbonate.getValue("mg/l") * 50 / 61);
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
   * Returns strike water
   * 
   * @returns strike water or null if not set
   */
  public getStrikeWater = (): VolumeValue => {
    return this.strikeWater;
  }

  /**
   * Sets strike water
   * 
   * @param value strike water value
   */
  public setStrikeWater = (value: VolumeValue) => {
    this.strikeWater = value;
  } 

  /**
   * Returns sparge water
   * 
   * @returns sparge water or null if not set
   */
  public getSpargeWater = (): VolumeValue => {
    return this.spargeWater;
  }

  /**
   * Sets sparge water
   * 
   * @param value sparge water value
   */
  public setSpargeWater = (value: VolumeValue) => {
    this.spargeWater = value;
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
   * Returns mash thickness
   * 
   * @returns mash thickness
   */
  public getMashThickness = () => {
    const strikeLiters = this.getStrikeWater().getValue("l");
    const gristWeight = this.getGristWeight().getValue("kg");
    return new DensityValue("l/kg", gristWeight == 0 || gristWeight == 0 ? 0 : strikeLiters / gristWeight);
  }
  
  /**
   * Returns total water
   * 
   * @returns total water
   */
  public getTotalWater = () => {
    const strikeLiters = this.strikeWater != null ? this.strikeWater.getValue("l") : 0;
    const spargeLiters = this.spargeWater != null ? this.spargeWater.getValue("l") : 0;
    return new VolumeValue("l", spargeLiters + strikeLiters);
  }

  /**
   * Returns gypsum
   * 
   * @returns gypsum or null if not set
   */
  public getGypsum = (): MassValue => {
    return this.gypsum;
  }

  /**
   * Sets gypsum
   * 
   * @param value gypsum value
   */
  public setGypsum = (value: MassValue) => {
    this.gypsum = value;
  }

  /**
   * Returns epsom
   * 
   * @returns epsom or null if not set
   */
  public getEpsom = (): MassValue => {
    return this.epsom;
  }

  /**
   * Sets epsom
   * 
   * @param value epsom value
   */
  public setEpsom = (value: MassValue) => {
    this.epsom = value;
  } 

  /**
   * Returns tablesalt
   * 
   * @returns tablesalt or null if not set
   */
  public getTableSalt = (): MassValue => {
    return this.tableSalt;
  }

  /**
   * Sets tablesalt
   * 
   * @param value tablesalt value
   */
  public setTableSalt = (value: MassValue) => {
    this.tableSalt = value;
  } 

  /**
   * Returns bakingsoda
   * 
   * @returns bakingsoda or null if not set
   */
  public getBakingSoda = (): MassValue => {
    return this.bakingSoda;
  }

  /**
   * Sets bakingsoda
   * 
   * @param value bakingsoda value
   */
  public setBakingSoda = (value: MassValue) => {
    this.bakingSoda = value;
  } 

  /**
   * Returns magnesiumchloride
   * 
   * @returns magnesiumchloride or null if not set
   */
  public getMagnesiumChloride = (): MassValue => {
    return this.magnesiumChloride;
  }

  /**
   * Sets magnesiumchloride
   * 
   * @param value magnesiumchloride value
   */
  public setMagnesiumChloride = (value: MassValue) => {
    this.magnesiumChloride = value;
  } 

  /**
   * Returns calciumchloride
   * 
   * @returns calciumchloride or null if not set
   */
  public getCalciumChloride = (): MassValue => {
    return this.calciumChloride;
  }

  /**
   * Sets calciumchloride
   * 
   * @param value calciumchloride value
   */
  public setCalciumChloride = (value: MassValue) => {
    this.calciumChloride = value;
  } 

  /**
   * Returns undissolved chalk
   * 
   * @returns undissolved chalk or null if not set
   */
  public getChalkUndissolved = (): MassValue => {
    return this.chalkUndissolved;
  }

  /**
   * Sets undissolved chalk
   * 
   * @param value undissolved chalk value
   */
  public setChalkUndissolved = (value: MassValue) => {
    this.chalkUndissolved = value;
  } 

  /**
   * Returns dissolved chalk
   * 
   * @returns dissolved chalk or null if not set
   */
  public getChalkDissolved = (): MassValue => {
    return this.chalkDissolved;
  }

  /**
   * Sets dissolved chalk
   * 
   * @param value dissolved chalk value
   */
  public setChalkDissolved = (value: MassValue) => {
    this.chalkDissolved = value;
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
   * @param waterVolume volume of water the ions are beign observed
   * @returns water ion mass concentrations after added salts
   */
  public getIonsAfterSalts(waterVolume: VolumeValue): WaterProfile {
    const result = this.getIonSaltChanges(waterVolume);
    
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
   * @param waterVolume volume of water the changes are observed
   * @returns water ion mass concentration changes caused by added salts
   */
  public getIonSaltChanges(waterVolume: VolumeValue): WaterProfile {
    const result: WaterProfile = {
      calcium: new CalciumValue("mg/l", 0),
      chloride: new ChlorideValue("mg/l", 0),
      magnesium: new MagnesiumValue("mg/l", 0),
      sodium: new SodiumValue("mg/l", 0),
      sulfate: new SulfateValue("mg/l", 0),
      bicarbonate: new BicarbonateValue("mg/l", 0)
    };

    if (waterVolume && waterVolume.getValue("l") > 0) {
      this.addSaltIonChanges(result, waterVolume, this.gypsum, saltIonMap.gypsum);
      this.addSaltIonChanges(result, waterVolume, this.epsom, saltIonMap.epsom);
      this.addSaltIonChanges(result, waterVolume, this.tableSalt, saltIonMap.tableSalt);
      this.addSaltIonChanges(result, waterVolume, this.calciumChloride, saltIonMap.calciumChloride);
      this.addSaltIonChanges(result, waterVolume, this.magnesiumChloride, saltIonMap.magnesiumChloride);
      this.addSaltIonChanges(result, waterVolume, this.bakingSoda, saltIonMap.bakingSoda);
      this.addSaltIonChanges(result, waterVolume, this.chalkUndissolved, saltIonMap.chalkUndissolved);
      this.addSaltIonChanges(result, waterVolume, this.chalkDissolved, saltIonMap.chalkDissolved);
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
   * Calculates mash pH change from salt additions
   * 
   * @returns mash pH change from salt additions
   */
  public getPhChangeFromSalts = (): PhValue | null => {
    const totalWater = this.getTotalWater();
    const strikeWater = this.getStrikeWater();
    const ionsFromSalts = this.getIonsAfterSalts(totalWater);
    const gristWeight = this.getGristWeight();

    const calcium = ionsFromSalts.calcium.subValue(this.getCalcium());
    const magnesium = ionsFromSalts.magnesium.subValue(this.getMagnesium());
    const bicarbonate = ionsFromSalts.bicarbonate.subValue(this.getBicarbonate());

    const caHardnessFromSalts = (calcium.getValue("mg/l") || 0) / 20;
    const mgHardnessFromSalts = (magnesium.getValue("mg/l") || 0) / 12.15;
    const alkalinityFromSalts = (bicarbonate.getValue("mg/l") || 0) / 61;

    const residualAlkalinityFromSalts = alkalinityFromSalts - caHardnessFromSalts / 3.5 - mgHardnessFromSalts / 7
    const totalResidualAlkalinityFromSalts = residualAlkalinityFromSalts * strikeWater.getValue("l");

    return new PhValue("pH", totalResidualAlkalinityFromSalts / consts.MASH_BUFFER_CAPACITY_FOR_WATER_RESIDUAL_ALKALINITY / gristWeight.getValue("kg"));
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
   * Returns pH change from base water
   * 
   * @returns pH change from base water
   */
  public getPhChangeFromBaseWater = (): PhValue | null => {
    const strikeWater = this.getStrikeWater();
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