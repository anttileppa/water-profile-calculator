export type WaterHardnessUnit = "dH" | "ppmCaCO3";
export type IonUnit = "mg/l" | "dH";
export type VolumeUnit = "ml" | "l" | "gal" | "qt";
export type MassUnit = "mg" | "g" | "kg" | "lb";
export type MassConcentrationToWaterUnit = "l/kg" | "qt/lb";
export type MassConcentrationInWaterUnit = "mg/l"; 
export type BeerColorUnit = "SRM" | "EBC";

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
  public getMassConcentrationInWater(waterVolume: VolumeValue): MassConcentrationInWaterValue | null {
    const mg = this.getValue("mg");
    const ml = waterVolume.getValue("l");
    return new MassConcentrationInWaterValue("mg/l", mg / ml);
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
export class MassConcentrationToWaterValue extends AbstractRatioBasedValue<MassConcentrationToWaterUnit> {

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: MassConcentrationToWaterUnit): number {
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
export class MassConcentrationInWaterValue extends AbstractRatioBasedValue<MassConcentrationInWaterUnit> {

  /**
   * Returns convert ratio into base unit
   * 
   * @param unit from unit
   */
  protected getConvertRatio(unit: MassConcentrationInWaterUnit): number {
    switch (unit) {
      case "mg/l":
        return 1;
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