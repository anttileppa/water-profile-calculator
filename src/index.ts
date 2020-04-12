import { AlkalinityValue, ChlorideValue, SulfateValue, IonValue, WaterHardnessValue, MagnesiumValue, CalciumValue, SodiumValue, VolumeValue, WeightValue, MassConcentrationValue, BeerColorValue } from "./units";
import consts from "./consts"; 

/**
 * Water profile calculator
 */
export default class WaterCalculator {

  private assumedMgContributionToTestedGh = consts.ASSUMED_MG_CONTRIBUTION_TO_TESTED_GH;
  private gh: WaterHardnessValue | null = null;
  private kh: WaterHardnessValue | null = null;
  private residualAlkalinity: AlkalinityValue | null = null;
  private calcium: CalciumValue = null;
  private magnesium: MagnesiumValue | null = null;
  private sodium: SodiumValue | null = null;
  private sulfate: SulfateValue | null = null;
  private chloride: ChlorideValue | null = null;
  private alkalinity: AlkalinityValue | null = null;
  private strikeWater: VolumeValue = new VolumeValue("l", 0);
  private spargeWater: VolumeValue = new VolumeValue("l", 0);
  private gristWeight: WeightValue = new WeightValue("kg", 0);
  private beerColor: BeerColorValue | null = null;

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
    this.setAlkalinity(value);
    this.calculateResidualAlkalinity();
  } 

  /**
   * Returns residual alkalinity
   * 
   * @returns residual alkalinity or null if not set
   */
  public getResidualAlkalinity = (): WaterHardnessValue => {
    return this.residualAlkalinity;
  }

  /**
   * Sets residual alkalinity
   * 
   * @param value residual alkalinity value
   */
  public setResidualAlkalinity = (value: WaterHardnessValue | null) => {
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
   * Returns calcium
   * 
   * @returns calcium or null if not set
   */
  public getCalcium = (): CalciumValue => {
    return this.calcium;
  }

  /**
   * Sets calcium
   * 
   * @param value calcium value
   */
  public setCalcium = (value: CalciumValue) => {
    this.calcium = value;
    this.calculateResidualAlkalinity();
  } 

  /**
   * Returns magnesium
   * 
   * @returns magnesium or null if not set
   */
  public getMagnesium = (): MagnesiumValue => {
    return this.magnesium;
  }

  /**
   * Sets magnesium
   * 
   * @param value magnesium value
   */
  public setMagnesium = (value: MagnesiumValue) => {
    this.magnesium = value;
    this.calculateResidualAlkalinity();
  } 
    
  /**
   * Returns sodium
   * 
   * @returns sodium or null if not set
   */
  public getSodium = (): SodiumValue => {
    return this.sodium;
  }

  /**
   * Sets sodium
   * 
   * @param value sodium value
   */
  public setSodium = (value: SodiumValue) => {
    this.sodium = value;
  } 

  /**
   * Returns sulfate
   * 
   * @returns sulfate or null if not set
   */
  public getSulfate = (): SulfateValue => {
    return this.sulfate;
  }

  /**
   * Sets sulfate
   * 
   * @param value sulfate value
   */
  public setSulfate = (value: SulfateValue) => {
    this.sulfate = value;
  } 

  /**
   * Returns chloride
   * 
   * @returns chloride or null if not set
   */
  public getChloride = (): ChlorideValue => {
    return this.chloride;
  }

  /**
   * Sets chloride
   * 
   * @param value chloride value
   */
  public setChloride = (value: ChlorideValue) => {
    this.chloride = value;
  } 

  /**
   * Returns alkalinity
   * 
   * @returns alkalinity or null if not set
   */
  public getAlkalinity = (): AlkalinityValue => {
    return this.alkalinity;
  }

  /**
   * Sets alkalinity
   * 
   * @param value alkalinity value
   */
  public setAlkalinity = (value: AlkalinityValue) => {
    this.alkalinity = value;
    this.calculateResidualAlkalinity();
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
  public getGristWeight = (): WeightValue => {
    return this.gristWeight;
  }

  /**
   * Sets grist weight
   * 
   * @param value grist weight value
   */
  public setGristWeight = (value: WeightValue) => {
    this.gristWeight = value;
  }

  /**
   * Returns beer color
   * 
   * @returns beer color or null if not set
   */
  public getBeerColor = (): BeerColorValue => {
    return this.beerColor;
  }

  /**
   * Sets beer color
   * 
   * @param value beer color value
   */
  public setBeerColor = (value: BeerColorValue) => {
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
    return new MassConcentrationValue("l/kg", gristWeight == 0 || gristWeight == 0 ? 0 : strikeLiters / gristWeight);
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
   * Calculates residual alkalinity
   */
  private calculateResidualAlkalinity = () => {
    if (this.alkalinity == null || this.calcium == null || this.magnesium == null) {
      return;
    }
    
    this.setResidualAlkalinity(new AlkalinityValue("dH", this.getAlkalinity().getValue("dH") - this.getCalcium().getValue("dH") / 3.5 - this.getMagnesium().getValue("dH") / 7));
  }

}