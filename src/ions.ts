import { CalciumValue, SulfateValue, MagnesiumValue, SodiumValue, ChlorideValue, BicarbonateValue } from "./units";

/**
 * Interface that describes salt ion concentrations
 */
export interface SaltIons {
  calcium?: CalciumValue,
  sulfate?: SulfateValue,
  magnesium?: MagnesiumValue,
  sodium?: SodiumValue,
  chloride?: ChlorideValue,
  bicarbonate?: BicarbonateValue
}

/**
 * Interface for salt ion map
 */
interface SaltIonMap {
  gypsum: SaltIons,
  epsom: SaltIons,
  tableSalt: SaltIons,
  calciumChloride: SaltIons,
  magnesiumChloride: SaltIons
  bakingSoda: SaltIons,
  chalkUndissolved: SaltIons,
  chalkDissolved: SaltIons,
}

/**
 * Salt ion concentrations
 */
export const saltIonMap: SaltIonMap = {
  gypsum: {
    calcium: new CalciumValue("mg/l", 40.08/172.19),
    sulfate: new SulfateValue("mg/l", 96.07/172.19)
  },
  epsom: {
    magnesium: new MagnesiumValue("mg/l", 24.3/246.51),
    sulfate: new SulfateValue("mg/l", 96.07/246.51)
  },
  tableSalt: {
    sodium: new SodiumValue("mg/l", 23/58.44),
    chloride: new ChlorideValue("mg/l", 35.45/58.44)
  },
  calciumChloride: {
    calcium: new CalciumValue("mg/l", 40.08/147.02),
    chloride: new ChlorideValue("mg/l", 70.9/147.02)
  },
  magnesiumChloride: {
    magnesium: new MagnesiumValue("mg/l", 24.3/203.32),
    chloride: new ChlorideValue("mg/l", 70.9/203.32)
  },
  bakingSoda: {
    sodium: new SodiumValue("mg/l", 23/84),
    bicarbonate: new BicarbonateValue("mg/l", 61/84),
  },
  chalkUndissolved: {
    calcium: new CalciumValue("mg/l", (40.08/100.09) / 2),
    bicarbonate: new BicarbonateValue("mg/l", (61 / 100.09))
  },
  chalkDissolved: {
    calcium: new CalciumValue("mg/l", 40.08/100.09),
    bicarbonate: new BicarbonateValue("mg/l", (61/100.09)*2)
  }
}

/**
 * Ion level type
 */
export type IonLevel = "recommended" | "toolow" | "toohigh" | "harmful";

/**
 * Interface for describing recommended ion levels
 */
export interface RecommendedIonLevels {
  calcium: IonLevel,
  sulfate: IonLevel,
  magnesium: IonLevel,
  sodium: IonLevel,
  chloride: IonLevel,
  bicarbonate: IonLevel
}

/**
 * Interface for describing recommended ion concentrations
 */
export interface RecommendedIonConcentrations {
  calcium: { min: CalciumValue, max: CalciumValue },
  sulfate: { min: SulfateValue, max: SulfateValue, harmful: SulfateValue },
  magnesium: { min: MagnesiumValue, max: MagnesiumValue, harmful: MagnesiumValue },
  sodium: { min: SodiumValue, max: SodiumValue, harmful: SodiumValue },
  chloride: { min: ChlorideValue, max: ChlorideValue },
  bicarbonate: { min: BicarbonateValue, max: BicarbonateValue },
}

/**
 * Type for ion names
 */
export type Ion = "calcium" | "magnesium"| "sodium" | "sulfate" | "chloride" | "bicarbonate";

/**
 * List of ion names
 */
export const ionList: Ion[] = ["calcium", "magnesium", "sodium", "sulfate", "chloride", "bicarbonate"];