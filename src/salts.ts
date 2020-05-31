import { MassValue, MassConcentrationValue } from "./units";

/**
 * Interface that contains salt additives
 */
export interface Salts {
  gypsum: MassValue | null,
  epsom: MassValue | null,
  tableSalt: MassValue | null,
  calciumChloride: MassValue | null,
  magnesiumChloride: MassValue | null,
  bakingSoda: MassValue | null,
  chalkUndissolved: MassValue | null,
  chalkDissolved: MassValue | null,
}

/**
 * Interface that contains salt additives as mass concentration values
 */
export interface SaltConcentrations {
  bakingSoda?: MassConcentrationValue;
  calciumChloride?: MassConcentrationValue;
  epsom?: MassConcentrationValue;
  gypsum?: MassConcentrationValue;
  magnesiumChloride?: MassConcentrationValue;
  tableSalt?: MassConcentrationValue
  chalkUndissolved?: MassConcentrationValue,
  chalkDissolved?: MassConcentrationValue
}

/**
 * Type for salt names
 */
export type Salt = "gypsum" | "epsom" | "tableSalt" | "bakingSoda" | "calciumChloride" | "magnesiumChloride" | "chalkUndissolved" | "chalkDissolved";

/**
 * List of salts
 */
export const saltList: Salt[] = ["gypsum" , "epsom" , "tableSalt" , "bakingSoda", "calciumChloride", "magnesiumChloride", "chalkUndissolved", "chalkDissolved"];