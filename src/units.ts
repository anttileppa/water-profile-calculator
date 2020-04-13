export type WaterHardnessUnit = "dH" | "ppmCaCO3";
export type VolumeUnit = "ml" | "l" | "gal" | "qt";
export type MassUnit = "mg" | "g" | "kg" | "lb";
export type DensityUnit = "l/kg" | "qt/lb";
export type MassConcentrationUnit = "mg/l" | "kg/l" | "mEq/l"; 
export type MassFractionUnit = "g/g" | "mg/kg";
export type BeerColorUnit = "SRM" | "EBC";
export type PhUnit = "pH";

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
   * Rounds value to given digits. Returns exact value if digits not specified
   * 
   * @param value value
   * @param digits digits
   * @returns rounded value
   */
  protected roundTo(value: number, digits?: number) {
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
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: VolumeUnit): number {
    switch (unit) {
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
    return new MassConcentrationValue("mg/l", mg / ml, NaN);
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

  private equivalentWeight: number;

  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   * @param equivalentWeight equivalent weight
   */
  constructor(unit: MassConcentrationUnit, value: number | null, equivalentWeight: number) {
    super(unit, value);
    this.equivalentWeight = equivalentWeight;
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
    }
  }
}

/**
 * Mass concentration of substance within another mass
 */
export class MassFractionValue extends AbstractRatioBasedValue<MassFractionUnit> {
  
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
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: WaterHardnessUnit): number {
    switch (unit) {
      case "dH":
        return 1;
      case "ppmCaCO3":
        return 0.0562;
    }
  }

}

/**
 * AlkalinityValue
 */
export class AlkalinityValue extends WaterHardnessValue {

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
    super(unit, value, 20);
  }
  
  public toDh(digits?: number) {
    return this.roundTo(this.getValue("mg/l") / 7.14, digits);
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
    super(unit, value, 12);
  }

  public toDh(digits?: number) {
    return this.roundTo(this.getValue("mg/l") / 4.33, digits);
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
    super(unit, value, 23);
  }

  public toDh(digits?: number) {
    return this.roundTo(this.getValue("mg/l") / 8.19, digits);
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
    super(unit, value, 48);
  }

  public toDh(digits?: number) {
    return this.roundTo(this.getValue("mg/l") / 17.1, digits);
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
    super(unit, value, 35);
  }

  public toDh(digits?: number) {
    return this.roundTo(this.getValue("mg/l") / 12.62, digits);
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
    super(unit, value, 61);
  }

}

/**
 * pH value
 */
export class PhValue extends AbstractRatioBasedValue<PhUnit> {
  
  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: "pH"): number {
    return 1;
  }

}