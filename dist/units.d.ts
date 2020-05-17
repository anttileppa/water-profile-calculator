export declare type WaterHardnessUnit = "dH" | "ppmCaCO3";
export declare type VolumeUnit = "μl" | "ml" | "l" | "gal" | "qt";
export declare type MassUnit = "mg" | "g" | "kg" | "lb";
export declare type DensityUnit = "l/kg" | "qt/lb";
export declare type MassConcentrationUnit = "mg/l" | "kg/l" | "mEq/l" | "dH";
export declare type MassFractionUnit = "g/g" | "mg/kg";
export declare type BeerColorUnit = "SRM" | "EBC";
export declare type PhUnit = "pH";
/**
 * Interface for a value
 */
export interface Value<U> {
    /**
     * Sets a value
     *
     * @param unit value unit
     * @param value numeric value in given unit
     */
    setValue: (unit: U, value: number | null) => void;
    /**
     * Returns a value
     *
     * @param unit value unit
     * @returns value in given unit
     */
    getValue: (unit: U) => number | null;
    /**
     * Adds given value to existing value
     *
     * @param unit value unit
     * @param value numeric value in given unit
     */
    add: (unit: U, value: number) => void;
}
/**
 * Abstract base class for all values
 */
export declare abstract class AbstactValue<U> implements Value<U> {
    private value;
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit: U, value: number | null);
    /**
     * Sets a value
     *
     * @param unit value unit
     * @param value numeric value in given unit
     */
    setValue(unit: U, value: number | null): void;
    /**
     * Returns a value
     *
     * @param unit value unit
     * @param roundTo rounds to given digits. Returns exact value if not specified
     * @returns value in given unit
     */
    getValue(unit: U, roundTo?: number): number | null;
    /**
     * Returns value's base unit
     *
     * @returns value's base unit
     */
    protected abstract getBaseUnit(): U;
    /**
     * Rounds value to given digits. Returns exact value if digits not specified
     *
     * @param value value
     * @param digits digits
     * @returns rounded value
     */
    protected roundTo(value: number, digits?: number): number;
    /**
     * Adds given value to existing value
     *
     * @param unit value unit
     * @param value numeric value in given unit
     */
    add(unit: U, value: number | null): void;
    /**
     * Substracts given value from existing value
     *
     * @param unit value unit
     * @param value numeric value in given unit
     */
    sub(unit: U, value: number | null): void;
    /**
     * Adds given value to existing value
     *
     * @param value value
     */
    addValue(value: AbstactValue<U>): this;
    /**
     * Substracts given value from existing value
     *
     * @param value value
     */
    subValue(value: AbstactValue<U>): this;
    /**
     * Converts value to type's base unit
     *
     * Base unit is an unit the value is stored internally
     *
     * @param unit value unit
     * @param value numeric value in given unit
     * @returns numeric value in base units
     */
    protected abstract toBaseUnit(unit: U, value: number): number;
    /**
     * Converts value from type's base unit into given unit
     *
     * Base unit is an unit the value is stored internally
     *
     * @param unit value unit
     * @param value numeric value in given unit
     * @returns numeric value in given units
     */
    protected abstract fromBaseUnit(unit: U, value: number): number;
}
/**
 * Abstract base class for values that can be converted using simple ratio
 */
export declare abstract class AbstractRatioBasedValue<U> extends AbstactValue<U> {
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    protected abstract getConvertRatio(unit: U): number;
    /**
     * Converts value to type's base unit
     *
     * Base unit is an unit the value is stored internally
     *
     * @param unit value unit
     * @param value numeric value in given unit
     * @returns numeric value in base units
     */
    protected toBaseUnit(unit: U, value: number): number;
    /**
     * Converts value from type's base unit into given unit
     *
     * Base unit is an unit the value is stored internally
     *
     * @param unit value unit
     * @param value numeric value in given unit
     * @returns numeric value in given units
     */
    protected fromBaseUnit(unit: U, value: number): number;
}
/**
 * Volume value
 */
export declare class VolumeValue extends AbstractRatioBasedValue<VolumeUnit> {
    /**
     * Returns value's base unit
     *
     * @returns value's base unit
     */
    protected getBaseUnit: () => VolumeUnit;
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    protected getConvertRatio(unit: VolumeUnit): number;
}
/**
 * Mass value
 */
export declare class MassValue extends AbstractRatioBasedValue<MassUnit> {
    /**
     * Returns mass concentration in water for given volume of water
     *
     * @param waterVolume water volume
     * @returns mass concentration in water for given volume of water
     */
    getMassConcentration(waterVolume: VolumeValue): MassConcentrationValue | null;
    /**
     * Returns mass fraction
     *
     * @param mass mass
     * @returns mass fraction
     */
    getMassFraction(mass: MassValue): MassFractionValue | null;
    /**
     * Returns value's base unit
     *
     * @returns value's base unit
     */
    protected getBaseUnit: () => MassUnit;
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    protected getConvertRatio(unit: MassUnit): number;
}
/**
 * Beer color value
 */
export declare class BeerColorValue extends AbstractRatioBasedValue<BeerColorUnit> {
    /**
     * Returns value's base unit
     *
     * @returns value's base unit
     */
    protected getBaseUnit: () => BeerColorUnit;
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    protected getConvertRatio(unit: BeerColorUnit): number;
}
/**
 * Mass concentration of substance to water value
 */
export declare class DensityValue extends AbstractRatioBasedValue<DensityUnit> {
    /**
     * Returns value's base unit
     *
     * @returns value's base unit
     */
    protected getBaseUnit: () => DensityUnit;
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    protected getConvertRatio(unit: DensityUnit): number;
}
/**
 * Mass concentration of substance in water value
 */
export declare class MassConcentrationValue extends AbstractRatioBasedValue<MassConcentrationUnit> {
    private dhRatio;
    private equivalentWeight;
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     * @param equivalentWeight equivalent weight
     */
    constructor(unit: MassConcentrationUnit, value: number | null, equivalentWeight: number, dhRatio: number);
    /**
     * Returns value's base unit
     *
     * @returns value's base unit
     */
    protected getBaseUnit: () => MassConcentrationUnit;
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    protected getConvertRatio(unit: MassConcentrationUnit): number;
}
/**
 * Mass concentration of substance within another mass
 */
export declare class MassFractionValue extends AbstractRatioBasedValue<MassFractionUnit> {
    /**
     * Returns value's base unit
     *
     * @returns value's base unit
     */
    protected getBaseUnit: () => MassFractionUnit;
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    protected getConvertRatio(unit: MassFractionUnit): number;
}
/**
 * Value for water hardness values (GH, KH)
 */
export declare class WaterHardnessValue extends AbstractRatioBasedValue<WaterHardnessUnit> {
    /**
     * Returns value's base unit
     *
     * @returns value's base unit
     */
    protected getBaseUnit: () => WaterHardnessUnit;
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    protected getConvertRatio(unit: WaterHardnessUnit): number;
}
/**
 * AlkalinityValue
 */
export declare class AlkalinityValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit: MassConcentrationUnit, value: number | null);
}
/**
 * Calcium ion value
 */
export declare class CalciumValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit: MassConcentrationUnit, value: number | null);
}
/**
 * Magnesium ion value
 */
export declare class MagnesiumValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit: MassConcentrationUnit, value: number | null);
}
/**
 * Sodium ion value
 */
export declare class SodiumValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit: MassConcentrationUnit, value: number | null);
}
/**
 * Sulfate ion value
 */
export declare class SulfateValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit: MassConcentrationUnit, value: number | null);
}
/**
 * Chloride ion value
 */
export declare class ChlorideValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit: MassConcentrationUnit, value: number | null);
}
/**
 * Bicarbonate ion value
 */
export declare class BicarbonateValue extends MassConcentrationValue {
    /**
     * Constructor
     *
     * @param unit value unit
     * @param value value in given unit
     */
    constructor(unit: MassConcentrationUnit, value: number | null);
}
/**
 * pH value
 */
export declare class PhValue extends AbstractRatioBasedValue<PhUnit> {
    /**
     * Returns value's base unit
     *
     * @returns value's base unit
     */
    protected getBaseUnit: () => PhUnit;
    /**
     * Returns convert ratio into base unit
     *
     * @param unit from unit
     */
    protected getConvertRatio(unit: "pH"): number;
}
