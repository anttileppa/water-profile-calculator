import { AlkalinityValue, WaterHardnessValue, PhValue, VolumeValue, MassValue, MassConcentrationValue } from "./units";
import WaterCalculator from ".";
import atomicWeight from "./atomic-weight";
import consts from "./consts";
import { Ions } from "./";
import molarMass from "./molar-mass";

/**
 * Interface describing a water treatment method
 */
export interface WaterTreatment {

  /**
   * Init method
   * 
   * @param waterCalculator water calculator instance
   */
  init(waterCalculator: WaterCalculator): void;
  
  /**
   * Returns pH change of treatment
   * 
   * @returns pH change of treatment
   */
  getPhChange(): PhValue;
  
}

/**
 * Abstract base class for all water treatment methods
 */
abstract class AbstractWaterTreatment implements WaterTreatment {

  private waterCalculator: WaterCalculator;

  /**
   * Init method
   * 
   * @param waterCalculator water calculator instance
   */
  public init = (waterCalculator: WaterCalculator) => {
    this.waterCalculator = waterCalculator;
  }
  
  /**
   * Returns final calcium hardness in mEq/l
   * 
   * @returns final calcium hardness in mEq/l
   */
  public abstract getFinalCaHardness(): number;

  /**
   * Returns final magnesium hardness in mEq/l
   * 
   * @returns magnesium hardness in mEq/l
   */
  public getFinalMgHardness = (): number => {
    return this.getMagnesiumHardness();
  }

  /**
   * Returns final alkalinity in mEq/l
   * 
   * @returns final alkalinity in mEq/l
   */
  public abstract getFinalAlkalinity(): AlkalinityValue;
  
  /**
   * Returns residual alkalinity
   * 
   * @returns residual alkalinity
   */
  public getResidualAlkalinity(): number {
    const finalAlkalinity = this.getFinalAlkalinity();
    const finalCaHardness = this.getFinalCaHardness(); 
    const finalMgHardness = this.getFinalMgHardness(); 
    return finalAlkalinity.getValue("mEq/l") - finalCaHardness / 3.5 - finalMgHardness / 7;    
  }

  /**
   * Returns pH change of treatment
   * 
   * @returns pH change of treatment
   */
  public getPhChange(): PhValue {
    const residualAlkalinity = this.getResidualAlkalinity();
    const residualAlkalinityInWater = residualAlkalinity * this.waterCalculator.getStrikeWater().getValue("l");
    return new PhValue("pH", residualAlkalinityInWater / this.waterCalculator.getGristWeight().getValue("kg") / consts.MASH_BUFFER_CAPACITY_FOR_WATER_RESIDUAL_ALKALINITY);
  }

  /**
   * Returns starting calcium
   * 
   * @returns starting calcium
   */
  protected getStartingCalcium() {
    return this.getIonsAfterSalts().calcium.getValue("mg/l");
  }

  /**
   * Returns starting magnesium
   * 
   * @returns starting magnesium
   */
  protected getStartingMagnesium() {
    return this.getIonsAfterSalts().magnesium.getValue("mg/l");
  }

  /**
   * Returns starting alkalinity
   * 
   * @returns starting alkalinity
   */
  protected getStartingAlkalinity() {
    return this.getIonsAfterSalts().bicarbonate.getValue("mEq/l");
  }

  /**
   * Returns calcium hardness
   * 
   * @returns calcium hardness
   */
  protected getCalciumHardness() {
    return this.getStartingCalcium() / atomicWeight.calcium * 2;
  }

  /**
   * Returns magnesium hardness
   * 
   * @returns magnesium hardness
   */
  protected getMagnesiumHardness() {
    return this.getStartingMagnesium() / atomicWeight.magnesium * 2;
  }

  /**
   * Returns alkalinity change
   * 
   * @returns alkalinity change
   */
  protected getAlkalinityChange() {
    return this.getStartingAlkalinity() - this.getCalciumHardness();
  }

  /**
   * Returns volume of treated water
   * 
   * @returns volume of treated water
   */
  private getTreatedWater() {
    return this.waterCalculator.getTotalWater();
  }

  /**
   * Returns ions after applied salts for treated volume of water
   * 
   * @returns ions after applied salts for treated volume of water
   */
  private getIonsAfterSalts() {
    return this.waterCalculator.getIonsAfterSalts(this.getTreatedWater());
  }

}

/**
 * Water treatment implementation using boiling to precipitate alkalinity.
 */
export class BoilingWaterTreatment extends AbstractWaterTreatment {

  private postBoilKh?: WaterHardnessValue;

  /**
   * Constructor
   * 
   * @param postBoilKh measured post boil KH (optional)
   */
  constructor(postBoilKh?: WaterHardnessValue) {
    super();
    this.postBoilKh = postBoilKh;
  }

  /**
   * Returns final calcium hardness in mEq/l
   * 
   * @returns final calcium hardness in mEq/l
   */
  public getFinalCaHardness = (): number => {
    const startingAlkalinity = this.getStartingAlkalinity();
    const calciumHardness = this.getCalciumHardness();

    const postBoilAlkalinity = this.getFinalAlkalinity().getValue("mEq/l");
    const postBoilAlkalinityDrop = Math.max(startingAlkalinity - postBoilAlkalinity, 0);
    const result = calciumHardness - postBoilAlkalinityDrop;
    return result;
  }

  /**
   * Returns final alkalinity in mEq/l
   * 
   * @returns final alkalinity in mEq/l
   */
  public getFinalAlkalinity  = (): AlkalinityValue | null => {  
    const postBoilAlkalinity = this.postBoilKh ? this.postBoilKh.getValue("dH") * 0.035 : this.getEstimatedPostBoilAlkalinity();
    return new AlkalinityValue("mEq/l", postBoilAlkalinity);
  }
  /**
   * Returns estimated post boil alkalinity in mEq/l
   * 
   * @returns estimated post boil alkalinity in mEq/l
   */
  private getEstimatedPostBoilAlkalinity() {
    const startingAlkalinity = this.getStartingAlkalinity();
    const alkalinityChange = this.getAlkalinityChange();

    if (startingAlkalinity < consts.LOWER_ALKALINITY_LIMIT_FOR_BOLING) {
      return startingAlkalinity;
    } else if (alkalinityChange < consts.LOWER_ALKALINITY_LIMIT_FOR_BOLING) {
      return consts.LOWER_ALKALINITY_LIMIT_FOR_BOLING;
    } else {
      return alkalinityChange;
    }
  }

}

/**
 * Water treatment implementation using lime to precipitate alkalinity.
 */
export class LimeWaterTreatment extends AbstractWaterTreatment {

  private postTreatmentGh?: WaterHardnessValue;
  private postTreatmentKh?: WaterHardnessValue;

  /**
   * Constructor
   * 
   * @param postTreatmentGh measured post treatment GH (optional)
   * @param postTreatmentKh measured post treatment KH (optional)
   */
  constructor(postTreatmentGh?: WaterHardnessValue, postTreatmentKh?: WaterHardnessValue) {
    super();
    this.postTreatmentGh = postTreatmentGh;
    this.postTreatmentKh = postTreatmentKh;
  }

  /**
   * Returns final calcium hardness in mEq/l
   * 
   * @returns final calcium hardness in mEq/l
   */
  public getFinalCaHardness = (): number => {
    const calciumHardness = this.getCalciumHardness();
    const magnesiumHardness = this.getMagnesiumHardness();
    return this.postTreatmentGh ? this.postTreatmentGh.getValue("dH") / 2.81 - magnesiumHardness : calciumHardness;
  }

  /**
   * Returns final alkalinity in mEq/l
   * 
   * @returns final alkalinity in mEq/l
   */
  public getFinalAlkalinity  = (): AlkalinityValue | null => {
    const startingAlkalinity = this.getStartingAlkalinity();
    return new AlkalinityValue("mEq/l", this.postTreatmentKh != null ? this.postTreatmentKh.getValue("dH") / 2.81 : startingAlkalinity);
  }

  /**
   * Returns required amount of calcium oxide or "lime" to treat the water
   * 
   * @param waterVolume volume of water to treat
   * @param phBeforeTreatment pH before treatment
   * @returns required concentration of calcium oxide or "lime" to treat the water
   */
  public getLimeNeededForLimeTreatment(waterVolume: VolumeValue, phBeforeTreatment: PhValue): MassValue {
    const limeConcentration = this.getLimeConcentrationForLimeTreatment(phBeforeTreatment);
    return new MassValue("g", limeConcentration.getValue("mg/l") * waterVolume.getValue("l") / 1000);
  }

  /**
   * Returns required concentration of calcium oxide or "lime" to treat the water
   * 
   * @param phBeforeTreatment pH before treatment
   * @returns required concentration of calcium oxide or "lime" to treat the water
   */
  public getLimeConcentrationForLimeTreatment(phBeforeTreatment: PhValue): MassConcentrationValue {
    const startingAlkalinity = this.getStartingAlkalinity();
    const carbonicAcidPKa1 = 6.40;
    const carbonicAcidPKa2 = 10.30
    const r1 = Math.pow(10, carbonicAcidPKa1 - phBeforeTreatment.getValue("pH"));
    const r2 = Math.pow(10, carbonicAcidPKa2 - phBeforeTreatment.getValue("pH"));
    const HCO3 = r2 * startingAlkalinity / (2 + r2);
    const H2CO3_CO2 = r1 * HCO3;
    const CO3 = HCO3 + 2 * H2CO3_CO2;
    const limeNeededForThisAmountOfOH = CO3 / 2;

    return new MassConcentrationValue("mg/l", limeNeededForThisAmountOfOH * molarMass.calciumOxide, NaN, NaN);
  }
}
