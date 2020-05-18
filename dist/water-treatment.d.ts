import { AlkalinityValue, WaterHardnessValue, PhValue, VolumeValue, MassValue, MassConcentrationValue } from "./units";
import WaterCalculator from "./water-calculator";
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
declare abstract class AbstractWaterTreatment implements WaterTreatment {
    private waterCalculator;
    /**
     * Init method
     *
     * @param waterCalculator water calculator instance
     */
    init: (waterCalculator: WaterCalculator) => void;
    /**
     * Returns final calcium hardness in mEq/l
     *
     * @returns final calcium hardness in mEq/l
     */
    abstract getFinalCaHardness(): number;
    /**
     * Returns final magnesium hardness in mEq/l
     *
     * @returns magnesium hardness in mEq/l
     */
    getFinalMgHardness: () => number;
    /**
     * Returns final alkalinity in mEq/l
     *
     * @returns final alkalinity in mEq/l
     */
    abstract getFinalAlkalinity(): AlkalinityValue;
    /**
     * Returns residual alkalinity
     *
     * @returns residual alkalinity
     */
    getResidualAlkalinity(): number;
    /**
     * Returns pH change of treatment
     *
     * @returns pH change of treatment
     */
    getPhChange(): PhValue;
    /**
     * Returns starting calcium
     *
     * @returns starting calcium
     */
    protected getStartingCalcium(): number;
    /**
     * Returns starting magnesium
     *
     * @returns starting magnesium
     */
    protected getStartingMagnesium(): number;
    /**
     * Returns starting alkalinity
     *
     * @returns starting alkalinity
     */
    protected getStartingAlkalinity(): number;
    /**
     * Returns calcium hardness
     *
     * @returns calcium hardness
     */
    protected getCalciumHardness(): number;
    /**
     * Returns magnesium hardness
     *
     * @returns magnesium hardness
     */
    protected getMagnesiumHardness(): number;
    /**
     * Returns alkalinity change
     *
     * @returns alkalinity change
     */
    protected getAlkalinityChange(): number;
    /**
     * Returns volume of treated water
     *
     * @returns volume of treated water
     */
    private getTreatedWater;
    /**
     * Returns ions after applied salts for treated volume of water
     *
     * @returns ions after applied salts for treated volume of water
     */
    private getIonsAfterSalts;
}
/**
 * Water treatment implementation using boiling to precipitate alkalinity.
 */
export declare class BoilingWaterTreatment extends AbstractWaterTreatment {
    private postBoilKh?;
    /**
     * Constructor
     *
     * @param postBoilKh measured post boil KH (optional)
     */
    constructor(postBoilKh?: WaterHardnessValue);
    /**
     * Returns final calcium hardness in mEq/l
     *
     * @returns final calcium hardness in mEq/l
     */
    getFinalCaHardness: () => number;
    /**
     * Returns final alkalinity in mEq/l
     *
     * @returns final alkalinity in mEq/l
     */
    getFinalAlkalinity: () => AlkalinityValue | null;
    /**
     * Returns estimated post boil alkalinity in mEq/l
     *
     * @returns estimated post boil alkalinity in mEq/l
     */
    private getEstimatedPostBoilAlkalinity;
}
/**
 * Water treatment implementation using lime to precipitate alkalinity.
 */
export declare class LimeWaterTreatment extends AbstractWaterTreatment {
    private postTreatmentGh?;
    private postTreatmentKh?;
    /**
     * Constructor
     *
     * @param postTreatmentGh measured post treatment GH (optional)
     * @param postTreatmentKh measured post treatment KH (optional)
     */
    constructor(postTreatmentGh?: WaterHardnessValue, postTreatmentKh?: WaterHardnessValue);
    /**
     * Returns final calcium hardness in mEq/l
     *
     * @returns final calcium hardness in mEq/l
     */
    getFinalCaHardness: () => number;
    /**
     * Returns final alkalinity in mEq/l
     *
     * @returns final alkalinity in mEq/l
     */
    getFinalAlkalinity: () => AlkalinityValue | null;
    /**
     * Returns required amount of calcium oxide or "lime" to treat the water
     *
     * @param waterVolume volume of water to treat
     * @param phBeforeTreatment pH before treatment
     * @returns required concentration of calcium oxide or "lime" to treat the water
     */
    getLimeNeededForLimeTreatment(waterVolume: VolumeValue, phBeforeTreatment: PhValue): MassValue;
    /**
     * Returns required concentration of calcium oxide or "lime" to treat the water
     *
     * @param phBeforeTreatment pH before treatment
     * @returns required concentration of calcium oxide or "lime" to treat the water
     */
    getLimeConcentrationForLimeTreatment(phBeforeTreatment: PhValue): MassConcentrationValue;
}
export {};
