"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimeWaterTreatment = exports.BoilingWaterTreatment = void 0;
const units_1 = require("./units");
const atomic_weight_1 = __importDefault(require("./atomic-weight"));
const consts_1 = __importDefault(require("./consts"));
const molar_mass_1 = __importDefault(require("./molar-mass"));
/**
 * Abstract base class for all water treatment methods
 */
class AbstractWaterTreatment {
    constructor() {
        /**
         * Init method
         *
         * @param waterCalculator water calculator instance
         */
        this.init = (waterCalculator) => {
            this.waterCalculator = waterCalculator;
        };
        /**
         * Returns final magnesium hardness in mEq/l
         *
         * @returns magnesium hardness in mEq/l
         */
        this.getFinalMgHardness = () => {
            return this.getMagnesiumHardness();
        };
    }
    /**
     * Returns residual alkalinity
     *
     * @returns residual alkalinity
     */
    getResidualAlkalinity() {
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
    getPhChange() {
        const residualAlkalinity = this.getResidualAlkalinity();
        const residualAlkalinityInWater = residualAlkalinity * this.waterCalculator.getStrikeWater().getValue("l");
        return new units_1.PhValue("pH", residualAlkalinityInWater / this.waterCalculator.getGristWeight().getValue("kg") / consts_1.default.MASH_BUFFER_CAPACITY_FOR_WATER_RESIDUAL_ALKALINITY);
    }
    /**
     * Returns starting calcium
     *
     * @returns starting calcium
     */
    getStartingCalcium() {
        return this.getIonsAfterSalts().calcium.getValue("mg/l");
    }
    /**
     * Returns starting magnesium
     *
     * @returns starting magnesium
     */
    getStartingMagnesium() {
        return this.getIonsAfterSalts().magnesium.getValue("mg/l");
    }
    /**
     * Returns starting alkalinity
     *
     * @returns starting alkalinity
     */
    getStartingAlkalinity() {
        return this.getIonsAfterSalts().bicarbonate.getValue("mEq/l");
    }
    /**
     * Returns calcium hardness
     *
     * @returns calcium hardness
     */
    getCalciumHardness() {
        return this.getStartingCalcium() / atomic_weight_1.default.calcium * 2;
    }
    /**
     * Returns magnesium hardness
     *
     * @returns magnesium hardness
     */
    getMagnesiumHardness() {
        return this.getStartingMagnesium() / atomic_weight_1.default.magnesium * 2;
    }
    /**
     * Returns alkalinity change
     *
     * @returns alkalinity change
     */
    getAlkalinityChange() {
        return this.getStartingAlkalinity() - this.getCalciumHardness();
    }
    /**
     * Returns volume of treated water
     *
     * @returns volume of treated water
     */
    getTreatedWater() {
        return this.waterCalculator.getTotalWater();
    }
    /**
     * Returns ions after applied salts for treated volume of water
     *
     * @returns ions after applied salts for treated volume of water
     */
    getIonsAfterSalts() {
        return this.waterCalculator.getIonsAfterSalts(this.getTreatedWater());
    }
}
/**
 * Water treatment implementation using boiling to precipitate alkalinity.
 */
class BoilingWaterTreatment extends AbstractWaterTreatment {
    /**
     * Constructor
     *
     * @param postBoilKh measured post boil KH (optional)
     */
    constructor(postBoilKh) {
        super();
        /**
         * Returns final calcium hardness in mEq/l
         *
         * @returns final calcium hardness in mEq/l
         */
        this.getFinalCaHardness = () => {
            const startingAlkalinity = this.getStartingAlkalinity();
            const calciumHardness = this.getCalciumHardness();
            const postBoilAlkalinity = this.getFinalAlkalinity().getValue("mEq/l");
            const postBoilAlkalinityDrop = Math.max(startingAlkalinity - postBoilAlkalinity, 0);
            const result = calciumHardness - postBoilAlkalinityDrop;
            return result;
        };
        /**
         * Returns final alkalinity in mEq/l
         *
         * @returns final alkalinity in mEq/l
         */
        this.getFinalAlkalinity = () => {
            const postBoilAlkalinity = this.postBoilKh ? this.postBoilKh.getValue("dH") * 0.035 : this.getEstimatedPostBoilAlkalinity();
            return new units_1.AlkalinityValue("mEq/l", postBoilAlkalinity);
        };
        this.postBoilKh = postBoilKh;
    }
    /**
     * Returns estimated post boil alkalinity in mEq/l
     *
     * @returns estimated post boil alkalinity in mEq/l
     */
    getEstimatedPostBoilAlkalinity() {
        const startingAlkalinity = this.getStartingAlkalinity();
        const alkalinityChange = this.getAlkalinityChange();
        if (startingAlkalinity < consts_1.default.LOWER_ALKALINITY_LIMIT_FOR_BOLING) {
            return startingAlkalinity;
        }
        else if (alkalinityChange < consts_1.default.LOWER_ALKALINITY_LIMIT_FOR_BOLING) {
            return consts_1.default.LOWER_ALKALINITY_LIMIT_FOR_BOLING;
        }
        else {
            return alkalinityChange;
        }
    }
}
exports.BoilingWaterTreatment = BoilingWaterTreatment;
/**
 * Water treatment implementation using lime to precipitate alkalinity.
 */
class LimeWaterTreatment extends AbstractWaterTreatment {
    /**
     * Constructor
     *
     * @param postTreatmentGh measured post treatment GH (optional)
     * @param postTreatmentKh measured post treatment KH (optional)
     */
    constructor(postTreatmentGh, postTreatmentKh) {
        super();
        /**
         * Returns final calcium hardness in mEq/l
         *
         * @returns final calcium hardness in mEq/l
         */
        this.getFinalCaHardness = () => {
            const calciumHardness = this.getCalciumHardness();
            const magnesiumHardness = this.getMagnesiumHardness();
            return this.postTreatmentGh ? this.postTreatmentGh.getValue("dH") / 2.81 - magnesiumHardness : calciumHardness;
        };
        /**
         * Returns final alkalinity in mEq/l
         *
         * @returns final alkalinity in mEq/l
         */
        this.getFinalAlkalinity = () => {
            const startingAlkalinity = this.getStartingAlkalinity();
            return new units_1.AlkalinityValue("mEq/l", this.postTreatmentKh != null ? this.postTreatmentKh.getValue("dH") / 2.81 : startingAlkalinity);
        };
        this.postTreatmentGh = postTreatmentGh;
        this.postTreatmentKh = postTreatmentKh;
    }
    /**
     * Returns required amount of calcium oxide or "lime" to treat the water
     *
     * @param waterVolume volume of water to treat
     * @param phBeforeTreatment pH before treatment
     * @returns required concentration of calcium oxide or "lime" to treat the water
     */
    getLimeNeededForLimeTreatment(waterVolume, phBeforeTreatment) {
        const limeConcentration = this.getLimeConcentrationForLimeTreatment(phBeforeTreatment);
        return new units_1.MassValue("g", limeConcentration.getValue("mg/l") * waterVolume.getValue("l") / 1000);
    }
    /**
     * Returns required concentration of calcium oxide or "lime" to treat the water
     *
     * @param phBeforeTreatment pH before treatment
     * @returns required concentration of calcium oxide or "lime" to treat the water
     */
    getLimeConcentrationForLimeTreatment(phBeforeTreatment) {
        const startingAlkalinity = this.getStartingAlkalinity();
        const carbonicAcidPKa1 = 6.40;
        const carbonicAcidPKa2 = 10.30;
        const r1 = Math.pow(10, carbonicAcidPKa1 - phBeforeTreatment.getValue("pH"));
        const r2 = Math.pow(10, carbonicAcidPKa2 - phBeforeTreatment.getValue("pH"));
        const HCO3 = r2 * startingAlkalinity / (2 + r2);
        const H2CO3_CO2 = r1 * HCO3;
        const CO3 = HCO3 + 2 * H2CO3_CO2;
        const limeNeededForThisAmountOfOH = CO3 / 2;
        return new units_1.MassConcentrationValue("mg/l", limeNeededForThisAmountOfOH * molar_mass_1.default.calciumOxide, NaN, NaN);
    }
}
exports.LimeWaterTreatment = LimeWaterTreatment;
//# sourceMappingURL=water-treatment.js.map