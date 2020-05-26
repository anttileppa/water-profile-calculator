import { ChlorideValue, SulfateValue, MagnesiumValue, CalciumValue, SodiumValue, BicarbonateValue } from "./units";

/**
 * Interface that contains values for water ion mass concentrations
 */
export interface WaterProfile {
  calcium: CalciumValue | null,
  magnesium: MagnesiumValue | null,
  sodium: SodiumValue | null,
  sulfate: SulfateValue | null,
  chloride: ChlorideValue | null,
  bicarbonate: BicarbonateValue | null
}