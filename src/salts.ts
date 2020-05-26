import { MassValue } from "./units";

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

export type Salt = "gypsum" | "epsom" | "tableSalt" | "bakingSoda" | "calciumChloride" | "magnesiumChloride" | "chalkUndissolved" | "chalkDissolved";

export const saltList: Salt[] = ["gypsum" , "epsom" , "tableSalt" , "bakingSoda", "calciumChloride", "magnesiumChloride", "chalkUndissolved", "chalkDissolved"];