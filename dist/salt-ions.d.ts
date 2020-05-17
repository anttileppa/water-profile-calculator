/**
 * Interface that describes salt ion concentrations
 */
export interface SaltIons {
    calcium?: number;
    sulfate?: number;
    magnesium?: number;
    sodium?: number;
    chloride?: number;
    bicarbonate?: number;
}
/**
 * Interface for salt ion map
 */
interface SaltIonMap {
    gypsum: SaltIons;
    epsom: SaltIons;
    tableSalt: SaltIons;
    calciumChloride: SaltIons;
    magnesiumChloride: SaltIons;
    bakingSoda: SaltIons;
    chalkUndissolved: SaltIons;
    chalkDissolved: SaltIons;
}
/**
 * Salt ion concentrations
 */
declare const saltIonMap: SaltIonMap;
export default saltIonMap;
