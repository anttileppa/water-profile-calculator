export type WaterHardnessUnit = "dH" | "ppmCaCO3";
export type IonUnit = "mg/l" | "dH";

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
   * @returns value in given unit
   */
  public getValue(unit: U): number | null {
    return this.value === null ? null : this.fromBaseUnit(unit, this.value);
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
 * Value for water hardness values (GH, KH)
 */
export class WaterHardnessValue extends AbstactValue<WaterHardnessUnit> {

  /**
   * Converts value to type's base unit
   * 
   * Base unit is an unit the value is stored internally
   * 
   * @param unit value unit
   * @param value numeric value in given unit
   * @returns numeric value in base units
   */
  protected toBaseUnit(unit: WaterHardnessUnit, value: number) : number {
    switch (unit) {
      case "dH":
        return value;
      case "ppmCaCO3":
        return value / 17.8;
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
  protected fromBaseUnit(unit: WaterHardnessUnit, value: number) : number {
    switch (unit) {
      case "dH":
        return value;
      case "ppmCaCO3":
        return value * 17.8;
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
export class CalciumValue extends IonValue {
  
  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   */
  constructor(unit: IonUnit, value: number | null) {
    super(unit, value, 7.14);
  }
}

/**
 * Magnesium ion value
 */
export class MagnesiumValue extends IonValue {

  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   */
  constructor(unit: IonUnit, value: number | null) {
    super(unit, value, 4.33);
  }
}

/**
 * Sodium ion value
 */
export class SodiumValue extends IonValue {

  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   */
  constructor(unit: IonUnit, value: number | null) {
    super(unit, value, 8.19);
  }
}

/**
 * Sulfate ion value
 */
export class SulfateValue extends IonValue {

  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   */
  constructor(unit: IonUnit, value: number | null) {
    super(unit, value, 17.1);
  }
}

/**
 * Chloride ion value
 */
export class ChlorideValue extends IonValue {

  /**
   * Constructor
   * 
   * @param unit value unit
   * @param value value in given unit
   */
  constructor(unit: IonUnit, value: number | null) {
    super(unit, value, 12.62);
  }
}