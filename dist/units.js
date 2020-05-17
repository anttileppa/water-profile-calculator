"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhValue = exports.BicarbonateValue = exports.ChlorideValue = exports.SulfateValue = exports.SodiumValue = exports.MagnesiumValue = exports.CalciumValue = exports.AlkalinityValue = exports.WaterHardnessValue = exports.MassFractionValue = exports.MassConcentrationValue = exports.DensityValue = exports.BeerColorValue = exports.MassValue = exports.VolumeValue = exports.AbstractRatioBasedValue = exports.AbstactValue = void 0;
/**
 * Abstract base class for all values
 */
class AbstactValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit, value) {
        this.value = null;
        this.setValue(unit, value);
    }
    /**
     * Sets a value
     *
     * @param unit value unit
     * @param value numeric value in given unit
     */
    setValue(unit, value) {
        this.value = value === null ? null : this.toBaseUnit(unit, value);
    }
    /**
     * Returns a value
     *
     * @param unit value unit
     * @param roundTo rounds to given digits. Returns exact value if not specified
     * @returns value in given unit
     */
    getValue(unit, roundTo) {
        const result = this.value === null ? null : this.fromBaseUnit(unit, this.value);
        return this.roundTo(result, roundTo);
    }
    /**
     * Rounds value to given digits. Returns exact value if digits not specified
     *
     * @param value value
     * @param digits digits
     * @returns rounded value
     */
    roundTo(value, digits) {
        if (digits === undefined) {
            return value;
        }
        const mod = Math.pow(10.0, digits);
        return Math.round(value * mod) / mod;
    }
    /**
     * Adds given value to existing value
     *
     * @param unit value unit
     * @param value numeric value in given unit
     */
    add(unit, value) {
        this.setValue(unit, this.getValue(unit) + value);
    }
    /**
     * Substracts given value from existing value
     *
     * @param unit value unit
     * @param value numeric value in given unit
     */
    sub(unit, value) {
        this.setValue(unit, this.getValue(unit) - value);
    }
    /**
     * Adds given value to existing value
     *
     * @param value value
     */
    addValue(value) {
        if (value) {
            const unit = this.getBaseUnit();
            this.add(unit, value.toBaseUnit(unit, value.getValue(unit)));
        }
        return this;
    }
    /**
     * Substracts given value from existing value
     *
     * @param value value
     */
    subValue(value) {
        if (value) {
            const unit = this.getBaseUnit();
            this.sub(unit, value.toBaseUnit(unit, value.getValue(unit)));
        }
        return this;
    }
}
exports.AbstactValue = AbstactValue;
/**
 * Abstract base class for values that can be converted using simple ratio
 */
class AbstractRatioBasedValue extends AbstactValue {
    /**
     * Converts value to type's base unit
     *
     * Base unit is an unit the value is stored internally
     *
     * @param unit value unit
     * @param value numeric value in given unit
     * @returns numeric value in base units
     */
    toBaseUnit(unit, value) {
        return value * this.getConvertRatio(unit);
    }
    /**
     * Converts value from type's base unit into given unit
     *
     * Base unit is an unit the value is stored internally
     *
     * @param unit value unit
     * @param value numeric value in given unit
     * @returns numeric value in given units
     */
    fromBaseUnit(unit, value) {
        return value / this.getConvertRatio(unit);
    }
}
exports.AbstractRatioBasedValue = AbstractRatioBasedValue;
/**
 * Volume value
 */
class VolumeValue extends AbstractRatioBasedValue {
    constructor() {
        super(...arguments);
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        this.getBaseUnit = () => {
            return "ml";
        };
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    getConvertRatio(unit) {
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
    }
}
exports.VolumeValue = VolumeValue;
/**
 * Mass value
 */
class MassValue extends AbstractRatioBasedValue {
    constructor() {
        super(...arguments);
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        this.getBaseUnit = () => {
            return "g";
        };
    }
    /**
     * Returns mass concentration in water for given volume of water
     *
     * @param waterVolume water volume
     * @returns mass concentration in water for given volume of water
     */
    getMassConcentration(waterVolume) {
        const mg = this.getValue("mg");
        const ml = waterVolume.getValue("l");
        return new MassConcentrationValue("mg/l", mg / ml, NaN, NaN);
    }
    /**
     * Returns mass fraction
     *
     * @param mass mass
     * @returns mass fraction
     */
    getMassFraction(mass) {
        return new MassFractionValue("g/g", this.getValue("g") / mass.getValue("g"));
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    getConvertRatio(unit) {
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
    }
}
exports.MassValue = MassValue;
/**
 * Beer color value
 */
class BeerColorValue extends AbstractRatioBasedValue {
    constructor() {
        super(...arguments);
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        this.getBaseUnit = () => {
            return "SRM";
        };
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    getConvertRatio(unit) {
        switch (unit) {
            case "SRM":
                return 1;
            case "EBC":
                return 0.5076142131979695;
        }
    }
}
exports.BeerColorValue = BeerColorValue;
/**
 * Mass concentration of substance to water value
 */
class DensityValue extends AbstractRatioBasedValue {
    constructor() {
        super(...arguments);
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        this.getBaseUnit = () => {
            return "l/kg";
        };
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    getConvertRatio(unit) {
        switch (unit) {
            case "l/kg":
                return 1;
            case "qt/lb":
                return 2.08635;
        }
    }
}
exports.DensityValue = DensityValue;
/**
 * Mass concentration of substance in water value
 */
class MassConcentrationValue extends AbstractRatioBasedValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     * @param equivalentWeight equivalent weight
     */
    constructor(unit, value, equivalentWeight, dhRatio) {
        super(unit, value);
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        this.getBaseUnit = () => {
            return "mg/l";
        };
        this.equivalentWeight = equivalentWeight;
        this.dhRatio = dhRatio;
        this.setValue(unit, value);
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    getConvertRatio(unit) {
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
    }
}
exports.MassConcentrationValue = MassConcentrationValue;
/**
 * Mass concentration of substance within another mass
 */
class MassFractionValue extends AbstractRatioBasedValue {
    constructor() {
        super(...arguments);
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        this.getBaseUnit = () => {
            return "g/g";
        };
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    getConvertRatio(unit) {
        switch (unit) {
            case "g/g":
                return 1;
            case "mg/kg":
                return 0.000001;
        }
    }
}
exports.MassFractionValue = MassFractionValue;
/**
 * Value for water hardness values (GH, KH)
 */
class WaterHardnessValue extends AbstractRatioBasedValue {
    constructor() {
        super(...arguments);
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        this.getBaseUnit = () => {
            return "dH";
        };
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    getConvertRatio(unit) {
        switch (unit) {
            case "dH":
                return 1;
            case "ppmCaCO3":
                return 1 / 17.8;
        }
    }
}
exports.WaterHardnessValue = WaterHardnessValue;
/**
 * AlkalinityValue
 */
class AlkalinityValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit, value) {
        super(unit, value, 50, 17.81);
    }
}
exports.AlkalinityValue = AlkalinityValue;
/**
 * Calcium ion value
 */
class CalciumValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit, value) {
        super(unit, value, 20, 7.14);
    }
}
exports.CalciumValue = CalciumValue;
/**
 * Magnesium ion value
 */
class MagnesiumValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit, value) {
        super(unit, value, 12, 4.33);
    }
}
exports.MagnesiumValue = MagnesiumValue;
/**
 * Sodium ion value
 */
class SodiumValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit, value) {
        super(unit, value, 23, 8.19);
    }
}
exports.SodiumValue = SodiumValue;
/**
 * Sulfate ion value
 */
class SulfateValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit, value) {
        super(unit, value, 48, 17.1);
    }
}
exports.SulfateValue = SulfateValue;
/**
 * Chloride ion value
 */
class ChlorideValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit, value) {
        super(unit, value, 35, 12.62);
    }
}
exports.ChlorideValue = ChlorideValue;
/**
 * Bicarbonate ion value
 */
class BicarbonateValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit, value) {
        super(unit, value, 61, 1 / (0.0562 * 0.6));
    }
}
exports.BicarbonateValue = BicarbonateValue;
/**
 * pH value
 */
class PhValue extends AbstractRatioBasedValue {
    constructor() {
        super(...arguments);
        /**
         * Returns value's base unit
         *
         * @returns value's base unit
         */
        this.getBaseUnit = () => {
            return "pH";
        };
    }
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    getConvertRatio(unit) {
        return 1;
    }
}
exports.PhValue = PhValue;
//# sourceMappingURL=units.js.map