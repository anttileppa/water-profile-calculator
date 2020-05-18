"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimeWaterTreatment = exports.BoilingWaterTreatment = void 0;
var units_1 = require("./units");
var atomic_weight_1 = __importDefault(require("./atomic-weight"));
var consts_1 = __importDefault(require("./consts"));
var molar_mass_1 = __importDefault(require("./molar-mass"));
/**
 * Abstract base class for all water treatment methods
 */
var AbstractWaterTreatment = /** @class */ (function () {
    function AbstractWaterTreatment() {
        var _this = this;
        /**
         * Init method
         *
         * @param waterCalculator water calculator instance
         */
        this.init = function (waterCalculator) {
            _this.waterCalculator = waterCalculator;
        };
        /**
         * Returns final magnesium hardness in mEq/l
         *
         * @returns magnesium hardness in mEq/l
         */
        this.getFinalMgHardness = function () {
            return _this.getMagnesiumHardness();
        };
    }
    /**
     * Returns residual alkalinity
     *
     * @returns residual alkalinity
     */
    AbstractWaterTreatment.prototype.getResidualAlkalinity = function () {
        var finalAlkalinity = this.getFinalAlkalinity();
        var finalCaHardness = this.getFinalCaHardness();
        var finalMgHardness = this.getFinalMgHardness();
        return finalAlkalinity.getValue("mEq/l") - finalCaHardness / 3.5 - finalMgHardness / 7;
    };
    /**
     * Returns pH change of treatment
     *
     * @returns pH change of treatment
     */
    AbstractWaterTreatment.prototype.getPhChange = function () {
        var residualAlkalinity = this.getResidualAlkalinity();
        var residualAlkalinityInWater = residualAlkalinity * this.waterCalculator.getStrikeWater().getValue("l");
        return new units_1.PhValue("pH", residualAlkalinityInWater / this.waterCalculator.getGristWeight().getValue("kg") / consts_1.default.MASH_BUFFER_CAPACITY_FOR_WATER_RESIDUAL_ALKALINITY);
    };
    /**
     * Returns starting calcium
     *
     * @returns starting calcium
     */
    AbstractWaterTreatment.prototype.getStartingCalcium = function () {
        return this.getIonsAfterSalts().calcium.getValue("mg/l");
    };
    /**
     * Returns starting magnesium
     *
     * @returns starting magnesium
     */
    AbstractWaterTreatment.prototype.getStartingMagnesium = function () {
        return this.getIonsAfterSalts().magnesium.getValue("mg/l");
    };
    /**
     * Returns starting alkalinity
     *
     * @returns starting alkalinity
     */
    AbstractWaterTreatment.prototype.getStartingAlkalinity = function () {
        return this.getIonsAfterSalts().bicarbonate.getValue("mEq/l");
    };
    /**
     * Returns calcium hardness
     *
     * @returns calcium hardness
     */
    AbstractWaterTreatment.prototype.getCalciumHardness = function () {
        return this.getStartingCalcium() / atomic_weight_1.default.calcium * 2;
    };
    /**
     * Returns magnesium hardness
     *
     * @returns magnesium hardness
     */
    AbstractWaterTreatment.prototype.getMagnesiumHardness = function () {
        return this.getStartingMagnesium() / atomic_weight_1.default.magnesium * 2;
    };
    /**
     * Returns alkalinity change
     *
     * @returns alkalinity change
     */
    AbstractWaterTreatment.prototype.getAlkalinityChange = function () {
        return this.getStartingAlkalinity() - this.getCalciumHardness();
    };
    /**
     * Returns volume of treated water
     *
     * @returns volume of treated water
     */
    AbstractWaterTreatment.prototype.getTreatedWater = function () {
        return this.waterCalculator.getTotalWater();
    };
    /**
     * Returns ions after applied salts for treated volume of water
     *
     * @returns ions after applied salts for treated volume of water
     */
    AbstractWaterTreatment.prototype.getIonsAfterSalts = function () {
        return this.waterCalculator.getIonsAfterSalts(this.getTreatedWater());
    };
    return AbstractWaterTreatment;
}());
/**
 * Water treatment implementation using boiling to precipitate alkalinity.
 */
var BoilingWaterTreatment = /** @class */ (function (_super) {
    __extends(BoilingWaterTreatment, _super);
    /**
     * Constructor
     *
     * @param postBoilKh measured post boil KH (optional)
     */
    function BoilingWaterTreatment(postBoilKh) {
        var _this = _super.call(this) || this;
        /**
         * Returns final calcium hardness in mEq/l
         *
         * @returns final calcium hardness in mEq/l
         */
        _this.getFinalCaHardness = function () {
            var startingAlkalinity = _this.getStartingAlkalinity();
            var calciumHardness = _this.getCalciumHardness();
            var postBoilAlkalinity = _this.getFinalAlkalinity().getValue("mEq/l");
            var postBoilAlkalinityDrop = Math.max(startingAlkalinity - postBoilAlkalinity, 0);
            var result = calciumHardness - postBoilAlkalinityDrop;
            return result;
        };
        /**
         * Returns final alkalinity in mEq/l
         *
         * @returns final alkalinity in mEq/l
         */
        _this.getFinalAlkalinity = function () {
            var postBoilAlkalinity = _this.postBoilKh ? _this.postBoilKh.getValue("dH") * 0.035 : _this.getEstimatedPostBoilAlkalinity();
            return new units_1.AlkalinityValue("mEq/l", postBoilAlkalinity);
        };
        _this.postBoilKh = postBoilKh;
        return _this;
    }
    /**
     * Returns estimated post boil alkalinity in mEq/l
     *
     * @returns estimated post boil alkalinity in mEq/l
     */
    BoilingWaterTreatment.prototype.getEstimatedPostBoilAlkalinity = function () {
        var startingAlkalinity = this.getStartingAlkalinity();
        var alkalinityChange = this.getAlkalinityChange();
        if (startingAlkalinity < consts_1.default.LOWER_ALKALINITY_LIMIT_FOR_BOLING) {
            return startingAlkalinity;
        }
        else if (alkalinityChange < consts_1.default.LOWER_ALKALINITY_LIMIT_FOR_BOLING) {
            return consts_1.default.LOWER_ALKALINITY_LIMIT_FOR_BOLING;
        }
        else {
            return alkalinityChange;
        }
    };
    return BoilingWaterTreatment;
}(AbstractWaterTreatment));
exports.BoilingWaterTreatment = BoilingWaterTreatment;
/**
 * Water treatment implementation using lime to precipitate alkalinity.
 */
var LimeWaterTreatment = /** @class */ (function (_super) {
    __extends(LimeWaterTreatment, _super);
    /**
     * Constructor
     *
     * @param postTreatmentGh measured post treatment GH (optional)
     * @param postTreatmentKh measured post treatment KH (optional)
     */
    function LimeWaterTreatment(postTreatmentGh, postTreatmentKh) {
        var _this = _super.call(this) || this;
        /**
         * Returns final calcium hardness in mEq/l
         *
         * @returns final calcium hardness in mEq/l
         */
        _this.getFinalCaHardness = function () {
            var calciumHardness = _this.getCalciumHardness();
            var magnesiumHardness = _this.getMagnesiumHardness();
            return _this.postTreatmentGh ? _this.postTreatmentGh.getValue("dH") / 2.81 - magnesiumHardness : calciumHardness;
        };
        /**
         * Returns final alkalinity in mEq/l
         *
         * @returns final alkalinity in mEq/l
         */
        _this.getFinalAlkalinity = function () {
            var startingAlkalinity = _this.getStartingAlkalinity();
            return new units_1.AlkalinityValue("mEq/l", _this.postTreatmentKh != null ? _this.postTreatmentKh.getValue("dH") / 2.81 : startingAlkalinity);
        };
        _this.postTreatmentGh = postTreatmentGh;
        _this.postTreatmentKh = postTreatmentKh;
        return _this;
    }
    /**
     * Returns required amount of calcium oxide or "lime" to treat the water
     *
     * @param waterVolume volume of water to treat
     * @param phBeforeTreatment pH before treatment
     * @returns required concentration of calcium oxide or "lime" to treat the water
     */
    LimeWaterTreatment.prototype.getLimeNeededForLimeTreatment = function (waterVolume, phBeforeTreatment) {
        var limeConcentration = this.getLimeConcentrationForLimeTreatment(phBeforeTreatment);
        return new units_1.MassValue("g", limeConcentration.getValue("mg/l") * waterVolume.getValue("l") / 1000);
    };
    /**
     * Returns required concentration of calcium oxide or "lime" to treat the water
     *
     * @param phBeforeTreatment pH before treatment
     * @returns required concentration of calcium oxide or "lime" to treat the water
     */
    LimeWaterTreatment.prototype.getLimeConcentrationForLimeTreatment = function (phBeforeTreatment) {
        var startingAlkalinity = this.getStartingAlkalinity();
        var carbonicAcidPKa1 = 6.40;
        var carbonicAcidPKa2 = 10.30;
        var r1 = Math.pow(10, carbonicAcidPKa1 - phBeforeTreatment.getValue("pH"));
        var r2 = Math.pow(10, carbonicAcidPKa2 - phBeforeTreatment.getValue("pH"));
        var HCO3 = r2 * startingAlkalinity / (2 + r2);
        var H2CO3_CO2 = r1 * HCO3;
        var CO3 = HCO3 + 2 * H2CO3_CO2;
        var limeNeededForThisAmountOfOH = CO3 / 2;
        return new units_1.MassConcentrationValue("mg/l", limeNeededForThisAmountOfOH * molar_mass_1.default.calciumOxide, NaN, NaN);
    };
    return LimeWaterTreatment;
}(AbstractWaterTreatment));
exports.LimeWaterTreatment = LimeWaterTreatment;
//# sourceMappingURL=water-treatment.js.map