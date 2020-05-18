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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PercentValue = exports.PhValue = exports.BicarbonateValue = exports.ChlorideValue = exports.SulfateValue = exports.SodiumValue = exports.MagnesiumValue = exports.CalciumValue = exports.AlkalinityValue = exports.WaterHardnessValue = exports.MassFractionValue = exports.MassConcentrationValue = exports.DensityValue = exports.BeerColorValue = exports.MassValue = exports.VolumeValue = exports.AbstractRatioBasedValue = exports.AbstactValue = void 0;
/**
 * Abstract base class for all values
 */
var AbstactValue = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    function AbstactValue(unit, value) {
        this.value = null;
        this.setValue(unit, value);
    }
    /**
     * Sets a value
     *
     * @param unit value unit
     * @param value numeric value in given unit
     */
    AbstactValue.prototype.setValue = function (unit, value) {
        this.value = value === null ? null : this.toBaseUnit(unit, value);
    };
    /**
     * Returns a value
     *
     * @param unit value unit
     * @param roundTo rounds to given digits. Returns exact value if not specified
     * @returns value in given unit
     */
    AbstactValue.prototype.getValue = function (unit, roundTo) {
        var result = this.value === null ? null : this.fromBaseUnit(unit, this.value);
        return this.roundTo(result, roundTo);
    };
    /**
     * Rounds value to given digits. Returns exact value if digits not specified
     *
     * @param value value
     * @param digits digits
     * @returns rounded value
     */
    AbstactValue.prototype.roundTo = function (value, digits) {
        if (digits === undefined) {
            return value;
        }
        var mod = Math.pow(10.0, digits);
        return Math.round(value * mod) / mod;
    };
    /**
     * Adds given value to existing value
     *
     * @param unit value unit
     * @param value numeric value in given unit
     */
    AbstactValue.prototype.add = function (unit, value) {
        this.setValue(unit, this.getValue(unit) + value);
    };
    /**
     * Substracts given value from existing value
     *
     * @param unit value unit
     * @param value numeric value in given unit
     */
    AbstactValue.prototype.sub = function (unit, value) {
        this.setValue(unit, this.getValue(unit) - value);
    };
    /**
     * Adds given value to existing value
     *
     * @param value value
     */
    AbstactValue.prototype.addValue = function (value) {
        if (value) {
            var unit = this.getBaseUnit();
            this.add(unit, value.toBaseUnit(unit, value.getValue(unit)));
        }
        return this;
    };
    /**
     * Substracts given value from existing value
     *
     * @param value value
     */
    AbstactValue.prototype.subValue = function (value) {
        if (value) {
            var unit = this.getBaseUnit();
            this.sub(unit, value.toBaseUnit(unit, value.getValue(unit)));
        }
        return this;
    };
    return AbstactValue;
}());
exports.AbstactValue = AbstactValue;
/**
 * Abstract base class for values that can be converted using simple ratio
 */
var AbstractRatioBasedValue = /** @class */ (function (_super) {
    __extends(AbstractRatioBasedValue, _super);
    function AbstractRatioBasedValue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Converts value to type's base unit
     *
     * Base unit is an unit the value is stored internally
     *
     * @param unit value unit
     * @param value numeric value in given unit
     * @returns numeric value in base units
     */
    AbstractRatioBasedValue.prototype.toBaseUnit = function (unit, value) {
        return value * this.getConvertRatio(unit);
    };
    /**
     * Converts value from type's base unit into given unit
     *
     * Base unit is an unit the value is stored internally
     *
     * @param unit value unit
     * @param value numeric value in given unit
     * @returns numeric value in given units
     */
    AbstractRatioBasedValue.prototype.fromBaseUnit = function (unit, value) {
        return value / this.getConvertRatio(unit);
    };
    return AbstractRatioBasedValue;
}(AbstactValue));
exports.AbstractRatioBasedValue = AbstractRatioBasedValue;
/**
 * Volume value
 */
var VolumeValue = /** @class */ (function (_super) {
    __extends(VolumeValue, _super);
    function VolumeValue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        _this.getBaseUnit = function () {
            return "ml";
        };
        return _this;
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    VolumeValue.prototype.getConvertRatio = function (unit) {
        switch (unit) {
            case "μl":
                return 0.001;
            case "ml":
                return 1;
            case "l":
                return 1000;
            case "gal":
                return 3785.41;
            case "qt":
                return 946.353;
        }
    };
    return VolumeValue;
}(AbstractRatioBasedValue));
exports.VolumeValue = VolumeValue;
/**
 * Mass value
 */
var MassValue = /** @class */ (function (_super) {
    __extends(MassValue, _super);
    function MassValue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        _this.getBaseUnit = function () {
            return "g";
        };
        return _this;
    }
    /**
     * Returns mass concentration in water for given volume of water
     *
     * @param waterVolume water volume
     * @returns mass concentration in water for given volume of water
     */
    MassValue.prototype.getMassConcentration = function (waterVolume) {
        var mg = this.getValue("mg");
        var ml = waterVolume.getValue("l");
        return new MassConcentrationValue("mg/l", mg / ml, NaN, NaN);
    };
    /**
     * Returns mass fraction
     *
     * @param mass mass
     * @returns mass fraction
     */
    MassValue.prototype.getMassFraction = function (mass) {
        return new MassFractionValue("g/g", this.getValue("g") / mass.getValue("g"));
    };
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    MassValue.prototype.getConvertRatio = function (unit) {
        switch (unit) {
            case "mg":
                return 0.001;
            case "g":
                return 1;
            case "kg":
                return 1000;
            case "lb":
                return 453.592;
        }
    };
    return MassValue;
}(AbstractRatioBasedValue));
exports.MassValue = MassValue;
/**
 * Beer color value
 */
var BeerColorValue = /** @class */ (function (_super) {
    __extends(BeerColorValue, _super);
    function BeerColorValue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        _this.getBaseUnit = function () {
            return "SRM";
        };
        return _this;
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    BeerColorValue.prototype.getConvertRatio = function (unit) {
        switch (unit) {
            case "SRM":
                return 1;
            case "EBC":
                return 0.5076142131979695;
        }
    };
    return BeerColorValue;
}(AbstractRatioBasedValue));
exports.BeerColorValue = BeerColorValue;
/**
 * Mass concentration of substance to water value
 */
var DensityValue = /** @class */ (function (_super) {
    __extends(DensityValue, _super);
    function DensityValue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        _this.getBaseUnit = function () {
            return "l/kg";
        };
        return _this;
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    DensityValue.prototype.getConvertRatio = function (unit) {
        switch (unit) {
            case "l/kg":
                return 1;
            case "qt/lb":
                return 2.08635;
        }
    };
    return DensityValue;
}(AbstractRatioBasedValue));
exports.DensityValue = DensityValue;
/**
 * Mass concentration of substance in water value
 */
var MassConcentrationValue = /** @class */ (function (_super) {
    __extends(MassConcentrationValue, _super);
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     * @param equivalentWeight equivalent weight
     */
    function MassConcentrationValue(unit, value, equivalentWeight, dhRatio) {
        var _this = _super.call(this, unit, value) || this;
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        _this.getBaseUnit = function () {
            return "mg/l";
        };
        _this.equivalentWeight = equivalentWeight;
        _this.dhRatio = dhRatio;
        _this.setValue(unit, value);
        return _this;
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    MassConcentrationValue.prototype.getConvertRatio = function (unit) {
        switch (unit) {
            case "mg/l":
                return 1;
            case "kg/l":
                return 1000000;
            case "mEq/l":
                return this.equivalentWeight;
            case "dH":
                return this.dhRatio;
        }
    };
    return MassConcentrationValue;
}(AbstractRatioBasedValue));
exports.MassConcentrationValue = MassConcentrationValue;
/**
 * Mass concentration of substance within another mass
 */
var MassFractionValue = /** @class */ (function (_super) {
    __extends(MassFractionValue, _super);
    function MassFractionValue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        _this.getBaseUnit = function () {
            return "g/g";
        };
        return _this;
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    MassFractionValue.prototype.getConvertRatio = function (unit) {
        switch (unit) {
            case "g/g":
                return 1;
            case "mg/kg":
                return 0.000001;
        }
    };
    return MassFractionValue;
}(AbstractRatioBasedValue));
exports.MassFractionValue = MassFractionValue;
/**
 * Value for water hardness values (GH, KH)
 */
var WaterHardnessValue = /** @class */ (function (_super) {
    __extends(WaterHardnessValue, _super);
    function WaterHardnessValue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        _this.getBaseUnit = function () {
            return "dH";
        };
        return _this;
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    WaterHardnessValue.prototype.getConvertRatio = function (unit) {
        switch (unit) {
            case "dH":
                return 1;
            case "ppmCaCO3":
                return 1 / 17.8;
        }
    };
    return WaterHardnessValue;
}(AbstractRatioBasedValue));
exports.WaterHardnessValue = WaterHardnessValue;
/**
 * AlkalinityValue
 */
var AlkalinityValue = /** @class */ (function (_super) {
    __extends(AlkalinityValue, _super);
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    function AlkalinityValue(unit, value) {
        return _super.call(this, unit, value, 50, 17.81) || this;
    }
    return AlkalinityValue;
}(MassConcentrationValue));
exports.AlkalinityValue = AlkalinityValue;
/**
 * Calcium ion value
 */
var CalciumValue = /** @class */ (function (_super) {
    __extends(CalciumValue, _super);
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    function CalciumValue(unit, value) {
        return _super.call(this, unit, value, 20, 7.14) || this;
    }
    return CalciumValue;
}(MassConcentrationValue));
exports.CalciumValue = CalciumValue;
/**
 * Magnesium ion value
 */
var MagnesiumValue = /** @class */ (function (_super) {
    __extends(MagnesiumValue, _super);
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    function MagnesiumValue(unit, value) {
        return _super.call(this, unit, value, 12, 4.33) || this;
    }
    return MagnesiumValue;
}(MassConcentrationValue));
exports.MagnesiumValue = MagnesiumValue;
/**
 * Sodium ion value
 */
var SodiumValue = /** @class */ (function (_super) {
    __extends(SodiumValue, _super);
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    function SodiumValue(unit, value) {
        return _super.call(this, unit, value, 23, 8.19) || this;
    }
    return SodiumValue;
}(MassConcentrationValue));
exports.SodiumValue = SodiumValue;
/**
 * Sulfate ion value
 */
var SulfateValue = /** @class */ (function (_super) {
    __extends(SulfateValue, _super);
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    function SulfateValue(unit, value) {
        return _super.call(this, unit, value, 48, 17.1) || this;
    }
    return SulfateValue;
}(MassConcentrationValue));
exports.SulfateValue = SulfateValue;
/**
 * Chloride ion value
 */
var ChlorideValue = /** @class */ (function (_super) {
    __extends(ChlorideValue, _super);
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    function ChlorideValue(unit, value) {
        return _super.call(this, unit, value, 35, 12.62) || this;
    }
    return ChlorideValue;
}(MassConcentrationValue));
exports.ChlorideValue = ChlorideValue;
/**
 * Bicarbonate ion value
 */
var BicarbonateValue = /** @class */ (function (_super) {
    __extends(BicarbonateValue, _super);
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    function BicarbonateValue(unit, value) {
        return _super.call(this, unit, value, 61, 1 / (0.0562 * 0.6)) || this;
    }
    return BicarbonateValue;
}(MassConcentrationValue));
exports.BicarbonateValue = BicarbonateValue;
/**
 * pH value
 */
var PhValue = /** @class */ (function (_super) {
    __extends(PhValue, _super);
    function PhValue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        _this.getBaseUnit = function () {
            return "pH";
        };
        return _this;
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    PhValue.prototype.getConvertRatio = function (unit) {
        return 1;
    };
    return PhValue;
}(AbstractRatioBasedValue));
exports.PhValue = PhValue;
/**
 * pH value
 */
var PercentValue = /** @class */ (function (_super) {
    __extends(PercentValue, _super);
    function PercentValue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        _this.getBaseUnit = function () {
            return "%";
        };
        return _this;
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    PercentValue.prototype.getConvertRatio = function (unit) {
        return 1;
    };
    return PercentValue;
}(AbstractRatioBasedValue));
exports.PercentValue = PercentValue;
//# sourceMappingURL=units.js.map