import { AlkalinityValue, ChlorideValue, SulfateValue, IonValue, WaterHardnessValue, MagnesiumValue, CalciumValue, SodiumValue } from "./units";
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