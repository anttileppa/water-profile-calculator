export type WaterHardnessUnit = "dH" | "ppmCaCO3";
export type IonUnit = "mg/l";

export interface Value<U> {

  setValue: (unit: U, value: number | null) => void;

  getValue: (unit: U) => number | null;

}

export abstract class AbstactValue<U> implements Value<U> {

  private value: number | null = null;

  constructor(unit: U, value: number | null) {
    this.setValue(unit, value);
  }

  public setValue(unit: U, value: number | null) {
    this.value = value === null ? null : this.toBaseUnit(unit, value);
  }

  public getValue(unit: U): number | null {
    return this.value === null ? null : this.fromBaseUnit(unit, this.value);
  }

  protected abstract toBaseUnit(unit: U, value: number) : number;

  protected abstract fromBaseUnit(unit: U, value: number) : number;

}

export class WaterHardnessValue extends AbstactValue<WaterHardnessUnit> {

  protected toBaseUnit(unit: WaterHardnessUnit, value: number) : number {
    switch (unit) {
      case "dH":
        return value;
      case "ppmCaCO3":
        return value / 17.8;
    }
  }

  protected fromBaseUnit(unit: WaterHardnessUnit, value: number) : number {
    switch (unit) {
      case "dH":
        return value;
      case "ppmCaCO3":
        return value * 17.8;
    }
  }

}

export class Ion extends AbstactValue<IonUnit> {

  protected toBaseUnit(unit: IonUnit, value: number) : number {
    switch (unit) {
      case "mg/l":
        return value;
    }
  }

  protected fromBaseUnit(unit: IonUnit, value: number) : number {
    switch (unit) {
      case "mg/l":
        return value;
    }
  }

}