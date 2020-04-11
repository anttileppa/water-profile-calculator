export type WaterHardnessUnit = "dH" | "ppmCaCO3";
export type IonUnit = "mg/l" | "dH";
export type VolumeUnit = "l" | "gal" | "qt";
export type WeightUnit = "kg" | "lb";

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

    if (roundTo !== undefined) {
      const mod = Math.pow(10.0, roundTo);
      return Math.round(result * mod) / mod;
    }

    return result;
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
      case "l":
        return 1;
      case "gal":
        return 3.78541;
      case "qt":
        return 0.946353;
    }
  }
}

/**
 * Weight value
 */
export class WeightValue extends AbstractRatioBasedValue<WeightUnit> {

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: WeightUnit): number {
    switch (unit) {
      case "kg":
        return 1;
      case "lb":
        return 0.453592;
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
 * Abstract base class ion values 
 */
export abstract class IonValue extends AbstactValue<IonUnit> {

  private dhRatio: number;

  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   * @param dhRatio ratio for converting mg/l tp dH
   */
  constructor(unit: IonUnit, value: number | null, dhRatio: number) {
    super(unit, value);
    this.dhRatio = dhRatio;
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
  protected toBaseUnit(unit: IonUnit, value: number) : number {
    switch (unit) {
      case "mg/l":
        return value;
      case "dH":
        return value * this.dhRatio;
    }
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
  protected fromBaseUnit(unit: IonUnit, value: number) : number {
    switch (unit) {
      case "mg/l":
        return value;
      case "dH":
        return value / this.dhRatio;
    }
  }

}

/**
 * Calcium ion value
 */
export class CalciumValue extends AbstractRatioBasedValue<IonUnit> {
  
  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: IonUnit): number {
    switch (unit) {
      case "mg/l":
        return 1;
      case "dH":
        return 7.14;
    }
  }
  
}

/**
 * Magnesium ion value
 */
export class MagnesiumValue extends AbstractRatioBasedValue<IonUnit> {
  
  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: IonUnit): number {
    switch (unit) {
      case "mg/l":
        return 1;
      case "dH":
        return 4.33;
    }
  }
}

/**
 * Sodium ion value
 */
export class SodiumValue extends AbstractRatioBasedValue<IonUnit> {

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: IonUnit): number {
    switch (unit) {
      case "mg/l":
        return 1;
      case "dH":
        return 8.19;
    }
  }

}

/**
 * Sulfate ion value
 */
export class SulfateValue extends AbstractRatioBasedValue<IonUnit> {

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: IonUnit): number {
    switch (unit) {
      case "mg/l":
        return 1;
      case "dH":
        return 17.1;
    }
  }

}

/**
 * Chloride ion value
 */
export class ChlorideValue extends AbstractRatioBasedValue<IonUnit> {

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: IonUnit): number {
    switch (unit) {
      case "mg/l":
        return 1;
      case "dH":
        return 12.62;
    }
  }

}