import { WaterHardnessUnit, Value, IonUnit, Ion } from "./units";
import consts from "./consts"; 

export default class WaterCalculator {

  private assumedMgContributionToTestedGh = consts.ASSUMED_MG_CONTRIBUTION_TO_TESTED_GH;
  private gh: Value<WaterHardnessUnit>;
  private kh: Value<WaterHardnessUnit>;
  private calcium: Value<IonUnit>;
  private magnesium: Value<IonUnit>;
  private sodium: Value<IonUnit>;
  private sulfate: Value<IonUnit>;
  private chloride: Value<IonUnit>;
  private bicarb: Value<IonUnit>;

  public getGH = (): Value<WaterHardnessUnit> => {
    return this.gh;
  }

  public setGH = (value: Value<WaterHardnessUnit>) => {
    this.gh = value;
    this.estimateCalciumAndMagnesiumFromGh();
  } 

  public getKH = (): Value<WaterHardnessUnit> => {
    return this.kh;
  }

  public setKH = (value: Value<WaterHardnessUnit>) => {
    this.kh = value;
  } 

  public getAssumedMgContributionToTestedGh = () => {
    return this.assumedMgContributionToTestedGh;
  }

  public setAssumedMgContributionToTestedGh = (assumedMgContributionToTestedGh: number) => {
    this.assumedMgContributionToTestedGh = assumedMgContributionToTestedGh;
    this.estimateCalciumAndMagnesiumFromGh();
  }

  public getCalcium = (): Value<IonUnit> => {
    return this.calcium;
  }

  public setCalcium = (value: Value<IonUnit>) => {
    this.calcium = value;
  } 

  public getMagnesium = (): Value<IonUnit> => {
    return this.magnesium;
  }

  public setMagnesium = (value: Value<IonUnit>) => {
    this.magnesium = value;
  } 
  

  private estimateCalciumAndMagnesiumFromGh = () => {
    if (this.gh == null) {
      return;
    }

    this.setCalcium(new Ion("mg/l", this.gh.getValue("ppmCaCO3") * (1 - this.assumedMgContributionToTestedGh / 100) / 17.8 * 7.14));
    this.setMagnesium(new Ion("mg/l", this.gh.getValue("ppmCaCO3") * (this.assumedMgContributionToTestedGh / 100) / 17.8 * 4.33));
  }

}