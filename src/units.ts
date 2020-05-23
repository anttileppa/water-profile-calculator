export type WaterHardnessUnit = "dH" | "ppmCaCO3";
export type VolumeUnit = "μl" | "ml" | "l" | "gal" | "qt";
export type MassUnit = "mg" | "g" | "kg" | "lb";
export type DensityUnit = "l/kg" | "qt/lb";
export type MassConcentrationUnit = "mg/l" | "kg/l" | "mEq/l" | "dH"; 
export type MassFractionUnit = "g/g" | "mg/kg";
export type BeerColorUnit = "SRM" | "EBC";
export type PhUnit = "pH";
export type PercentUnit = "%";
export type TimeUnit =  "d" | "h" | "min" | "s";

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
  setValue: (unit: U, value: number | null) => void;

  /**
   * Returns a value
   * 
   * @param unit value unit
   * @returns value in given unit
   */
  getValue: (unit: U) => number | null;

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
export abstract class AbstactValue<U> implements Value<U> {

  private value: number | null = null;

  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   */
  constructor(unit: U, value: number | null) {
    this.setValue(unit, value);
  }

  /**
   * Sets a value
   * 
   * @param unit value unit
   * @param value numeric value in given unit
   */
  public setValue(unit: U, value: number | null) {
    this.value = value === null ? null : this.toBaseUnit(unit, value);
  }

  /**
   * Returns a value
   * 
   * @param unit value unit
   * @param roundTo rounds to given digits. Returns exact value if not specified
   * @returns value in given unit
   */
  public getValue(unit: U, roundTo?: number): number | null {
    const result = this.value === null ? null : this.fromBaseUnit(unit, this.value);
    return this.roundTo(result, roundTo);
  }

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
  protected roundTo(value: number | null, digits?: number) {
    if (value === null) {
      return null;
    }

    if (digits === undefined) {
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
  public add(unit: U, value: number | null) {
    this.setValue(unit, this.getValue(unit) + value);
  }

  /**
   * Substracts given value from existing value
   * 
   * @param unit value unit
   * @param value numeric value in given unit
   */
  public sub(unit: U, value: number | null) {
    this.setValue(unit, this.getValue(unit) - value);
  }

  /**
   * Adds given value to existing value
   * 
   * @param value value
   */
  public addValue(value: AbstactValue<U>) {
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
  public subValue(value: AbstactValue<U>) {
    if (value) {
      const unit = this.getBaseUnit();
      this.sub(unit, value.toBaseUnit(unit, value.getValue(unit)));
    }

    return this;
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
  protected abstract toBaseUnit(unit: U, value: number) : number;
  
  /**
   * Converts value from type's base unit into given unit
   * 
   * Base unit is an unit the value is stored internally
   * 
   * @param unit value unit
   * @param value numeric value in given unit
   * @returns numeric value in given units
   */
  protected abstract fromBaseUnit(unit: U, value: number) : number;

}

/**
 * Abstract base class for values that can be converted using simple ratio 
 */
export abstract class AbstractRatioBasedValue<U> extends AbstactValue<U> {

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
  protected toBaseUnit(unit: U, value: number) : number {
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
  protected fromBaseUnit(unit: U, value: number) : number {
    return value / this.getConvertRatio(unit);
  }

}

/**
 * Volume value
 */
export class VolumeValue extends AbstractRatioBasedValue<VolumeUnit> {
  
  /**
   * Returns value's base unit
   * 
   * @returns value's base unit
   */
  protected getBaseUnit = (): VolumeUnit => {
    return "ml";
  }

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: VolumeUnit): number {
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

/**
 * Mass value
 */
export class MassValue extends AbstractRatioBasedValue<MassUnit> {

  /**
   * Returns mass concentration in water for given volume of water
   * 
   * @param waterVolume water volume
   * @returns mass concentration in water for given volume of water
   */
  public getMassConcentration(waterVolume: VolumeValue): MassConcentrationValue | null {
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
  public getMassFraction(mass: MassValue): MassFractionValue | null {
    return new MassFractionValue("g/g", this.getValue("g") / mass.getValue("g"));
  }

  /**
   * Returns value's base unit
   * 
   * @returns value's base unit
   */
  protected getBaseUnit = (): MassUnit => {
    return "g";
  }

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: MassUnit): number {
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

/**
 * Beer color value
 */
export class BeerColorValue extends AbstractRatioBasedValue<BeerColorUnit> {

  /**
   * Returns value's base unit
   * 
   * @returns value's base unit
   */
  protected getBaseUnit = (): BeerColorUnit => {
    return "SRM";
  }

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: BeerColorUnit): number {
    switch (unit) {
      case "SRM":
        return 1;
      case "EBC":
        return 0.5076142131979695;
    }
  }
}

/**
 * Mass concentration of substance to water value
 */
export class DensityValue extends AbstractRatioBasedValue<DensityUnit> {

  /**
   * Returns value's base unit
   * 
   * @returns value's base unit
   */
  protected getBaseUnit = (): DensityUnit => {
    return "l/kg";
  }

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: DensityUnit): number {
    switch (unit) {
      case "l/kg":
        return 1;
      case "qt/lb":
        return 2.08635;
    }
  }
}

/**
 * Mass concentration of substance in water value
 */
export class MassConcentrationValue extends AbstractRatioBasedValue<MassConcentrationUnit> {

  private dhRatio: number;
  private equivalentWeight: number;

  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   * @param equivalentWeight equivalent weight
   */
  constructor(unit: MassConcentrationUnit, value: number | null, equivalentWeight: number, dhRatio: number) {
    super(unit, value);
    this.equivalentWeight = equivalentWeight;
    this.dhRatio = dhRatio;
    this.setValue(unit, value);
  }

  /**
   * Returns value's base unit
   * 
   * @returns value's base unit
   */
  protected getBaseUnit = (): MassConcentrationUnit => {
    return "mg/l";
  }

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: MassConcentrationUnit): number {
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

/**
 * Mass concentration of substance within another mass
 */
export class MassFractionValue extends AbstractRatioBasedValue<MassFractionUnit> {
  
  /**
   * Returns value's base unit
   * 
   * @returns value's base unit
   */
  protected getBaseUnit = (): MassFractionUnit => {
    return "g/g";
  }

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: MassFractionUnit): number {
    switch (unit) {
      case "g/g":
        return 1;
      case "mg/kg":
        return 0.000001;
    }
  }

}

/**
 * Value for water hardness values (GH, KH)
 */
export class WaterHardnessValue extends AbstractRatioBasedValue<WaterHardnessUnit> {

  /**
   * Returns value's base unit
   * 
   * @returns value's base unit
   */
  protected getBaseUnit = (): WaterHardnessUnit => {
    return "dH";
  }

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: WaterHardnessUnit): number {
    switch (unit) {
      case "dH":
        return 1;
      case "ppmCaCO3":
        return 1 / 17.8;
    }
  }

}

/**
 * AlkalinityValue
 */
export class AlkalinityValue extends MassConcentrationValue {
  
  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   */
  constructor(unit: MassConcentrationUnit, value: number | null) {
    super(unit, value, 50, 17.81);
  }

}

/**
 * Calcium ion value
 */
export class CalciumValue extends MassConcentrationValue {

  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   */
  constructor(unit: MassConcentrationUnit, value: number | null) {
    super(unit, value, 20, 7.14);
  }
  
}

/**
 * Magnesium ion value
 */
export class MagnesiumValue extends MassConcentrationValue {
  
  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   */
  constructor(unit: MassConcentrationUnit, value: number | null) {
    super(unit, value, 12, 4.33);
  }

}

/**
 * Sodium ion value
 */
export class SodiumValue extends MassConcentrationValue {
  
  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   */
  constructor(unit: MassConcentrationUnit, value: number | null) {
    super(unit, value, 23, 8.19);
  }

}

/**
 * Sulfate ion value
 */
export class SulfateValue extends MassConcentrationValue {

  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   */
  constructor(unit: MassConcentrationUnit, value: number | null) {
    super(unit, value, 48, 17.1);
  }

}

/**
 * Chloride ion value
 */
export class ChlorideValue extends MassConcentrationValue {

  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   */
  constructor(unit: MassConcentrationUnit, value: number | null) {
    super(unit, value, 35, 12.62);
  }

}

/**
 * Bicarbonate ion value
 */
export class BicarbonateValue extends MassConcentrationValue {

  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   */
  constructor(unit: MassConcentrationUnit, value: number | null) {
    super(unit, value, 61, 1 / (0.0562 * 0.6));
  }

}

/**
 * pH value
 */
export class PhValue extends AbstractRatioBasedValue<PhUnit> {
  
  /**
   * Returns value's base unit
   * 
   * @returns value's base unit
   */
  protected getBaseUnit = (): PhUnit => {
    return "pH";
  }

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: "pH"): number {
    return 1;
  }

}

/**
 * pH value
 */
export class PercentValue extends AbstractRatioBasedValue<PercentUnit> {
  
  /**
   * Returns value's base unit
   * 
   * @returns value's base unit
   */
  protected getBaseUnit = (): PercentUnit => {
    return "%";
  }

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: PercentUnit): number {
    return 1;
  }

}

/**
 * Time value
 */
export class TimeValue extends AbstractRatioBasedValue<TimeUnit> {
  
  /**
   * Returns value's base unit
   * 
   * @returns value's base unit
   */
  protected getBaseUnit = (): TimeUnit => {
    return "s";
  }

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: TimeUnit): number {
    switch (unit) {
      case "s":
        return 1;
      case "min":
        return 60;
      case "h":
        return 60 * 60;
      case "d":
        return 60 * 60 * 24;
    }
  }

}