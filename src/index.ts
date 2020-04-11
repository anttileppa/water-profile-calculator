import { WaterHardnessUnit, Value, IonUnit, Ion } from "./units";
import consts from "./consts"; 

/**
 * Water profile calculator
 */
export default class WaterCalculator {

  private assumedMgContributionToTestedGh = consts.ASSUMED_MG_CONTRIBUTION_TO_TESTED_GH;
  private gh: Value<WaterHardnessUnit> | null;
  private kh: Value<WaterHardnessUnit> | null;
  private calcium: Value<IonUnit> | null;
  private magnesium: Value<IonUnit> | null;
  private sodium: Value<IonUnit> | null;
  private sulfate: Value<IonUnit> | null;
  private chloride: Value<IonUnit> | null;
  private bicarb: Value<IonUnit> | null;

  /**
   * Returns GH
   * 
   * @returns GH or null if not set
   */
  public getGH = (): Value<WaterHardnessUnit> | null => {
    return this.gh;
  }

  /**
   * Sets GH
   * 
   * @param value GH value
   */
  public setGH = (value: Value<WaterHardnessUnit> | null) => {
    this.gh = value;
    this.estimateCalciumAndMagnesiumFromGh();
  } 

  /**
   * Returns KH
   * 
   * @returns KH or null if not set
   */
  public getKH = (): Value<WaterHardnessUnit> => {
    return this.kh;
  }

  /**
   * Sets KH
   * 
   * @param value KH value
   */
  public setKH = (value: Value<WaterHardnessUnit> | null) => {
    this.kh = value;
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
  public getCalcium = (): Value<IonUnit> => {
    return this.calcium;
  }

  /**
   * Sets calcium
   * 
   * @param value calcium value
   */
  public setCalcium = (value: Value<IonUnit>) => {
    this.calcium = value;
  } 

  /**
   * Returns magnesium
   * 
   * @returns magnesium or null if not set
   */
  public getMagnesium = (): Value<IonUnit> => {
    return this.magnesium;
  }

  /**
   * Sets magnesium
   * 
   * @param value magnesium value
   */
  public setMagnesium = (value: Value<IonUnit>) => {
    this.magnesium = value;
  } 
  
  /**
   * Estimates amount of calcium and magnesium from GH
   */
  private estimateCalciumAndMagnesiumFromGh = () => {
    if (this.gh == null) {
      return;
    }

    this.setCalcium(new Ion("mg/l", this.gh.getValue("ppmCaCO3") * (1 - this.assumedMgContributionToTestedGh / 100) / 17.8 * 7.14));
    this.setMagnesium(new Ion("mg/l", this.gh.getValue("ppmCaCO3") * (this.assumedMgContributionToTestedGh / 100) / 17.8 * 4.33));
  }

}