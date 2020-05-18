import { PhValue, AlkalinityValue, ChlorideValue, SulfateValue, WaterHardnessValue, MagnesiumValue, CalciumValue, SodiumValue, VolumeValue, DensityValue, BeerColorValue, MassValue, BicarbonateValue, PercentValue } from "./units";
import { WaterTreatment } from "./water-treatment";
/**
 * Interface that contains values for water ion mass concentrations
 */
export interface Ions {
    calcium: CalciumValue;
    magnesium: MagnesiumValue;
    sodium: SodiumValue;
    sulfate: SulfateValue;
    chloride: ChlorideValue;
    bicarbonate: BicarbonateValue;
}
/**
 * Water profile calculator
 */
export default class WaterCalculator {
    private assumedMgContributionToTestedGh;
    private maltRoastedPercent;
    private gh;
    private kh;
    private residualAlkalinity;
    private calcium;
    private magnesium;
    private sodium;
    private sulfate;
    private chloride;
    private bicarbonate;
    private alkalinity;
    private strikeWater;
    private spargeWater;
    private gristWeight;
    private beerColor;
    private gypsum;
    private epsom;
    private tableSalt;
    private calciumChloride;
    private magnesiumChloride;
    private bakingSoda;
    private chalkUndissolved;
    private chalkDissolved;
    private lacticAcid;
    private phosphoricAcid;
    private acidMalt;
    private waterTreatment;
    /**
     * Returns GH
     *
     * @returns GH or null if not set
     */
    getGH: () => WaterHardnessValue | null;
    /**
     * Sets GH
     *
     * @param value GH value
     */
    setGH: (value: WaterHardnessValue | null) => void;
    /**
     * Returns KH
     *
     * @returns KH or null if not set
     */
    getKH: () => WaterHardnessValue;
    /**
     * Sets KH
     *
     * @param value KH value
     */
    setKH: (value: WaterHardnessValue | null) => void;
    /**
     * Returns residual alkalinity
     *
     * @returns residual alkalinity or null if not set
     */
    getResidualAlkalinity: () => AlkalinityValue | null;
    /**
     * Sets residual alkalinity
     *
     * @param value residual alkalinity value
     */
    setResidualAlkalinity: (value: AlkalinityValue | null) => void;
    /**
     * Returns assumed MG contribution to tested gH
     *
     * Defaults to 30 %
     *
     * @returns assumed MG contribution to tested gH
     */
    getAssumedMgContributionToTestedGh: () => number;
    /**
     * Sets the assumed MG contribution to tested gH
     *
     * @param assumedMgContributionToTestedGh assumed MG contribution to tested gH
     */
    setAssumedMgContributionToTestedGh: (assumedMgContributionToTestedGh: number) => void;
    /**
     * Returns malt roasted percent
     *
     * The “roasted %” allows you to specify how much of the beer's color is contributed by roasted malts.
     * E.g. if a beer is brewed with 90% 2-row, 7% 60 Lovibond cara malts and 3% 500 Lovibond roasted malts,
     * the roasted malt portion of the color is 3%*500/(7%*60+3%*500)=78% (this neglects the color from the 2-row).
     *
     * @returns malt roasted percent
     */
    getMaltRoastedPercent(): PercentValue;
    /**
     * Sets malt roasted percent
     *
     * @returns malt roasted percent
     */
    setMaltRoastedPercent(maltRoastedPercent: PercentValue | null): void;
    /**
     * Returns calcium
     *
     * @returns calcium or null if not set
     */
    getCalcium: () => CalciumValue | null;
    /**
     * Sets calcium
     *
     * @param value calcium value
     */
    setCalcium: (value: CalciumValue | null) => void;
    /**
     * Returns magnesium
     *
     * @returns magnesium or null if not set
     */
    getMagnesium: () => MagnesiumValue | null;
    /**
     * Sets magnesium
     *
     * @param value magnesium value
     */
    setMagnesium: (value: MagnesiumValue | null) => void;
    /**
     * Returns sodium
     *
     * @returns sodium or null if not set
     */
    getSodium: () => SodiumValue | null;
    /**
     * Sets sodium
     *
     * @param value sodium value
     */
    setSodium: (value: SodiumValue | null) => void;
    /**
     * Returns sulfate
     *
     * @returns sulfate or null if not set
     */
    getSulfate: () => SulfateValue | null;
    /**
     * Sets sulfate
     *
     * @param value sulfate value
     */
    setSulfate: (value: SulfateValue | null) => void;
    /**
     * Returns chloride
     *
     * @returns chloride or null if not set
     */
    getChloride: () => ChlorideValue | null;
    /**
     * Sets chloride
     *
     * @param value chloride value
     */
    setChloride: (value: ChlorideValue | null) => void;
    /**
     * Returns bicarbonate
     *
     * @returns bicarbonate or null if not set
     */
    getBicarbonate: () => BicarbonateValue | null;
    /**
     * Sets bicarbonate
     *
     * @param value bicarbonate value
     */
    setBicarbonate: (value: BicarbonateValue | null) => void;
    /**
     * Returns alkalinity either from given alkalinity value or
     * value derived from given bicarbonate value
     *
     * @returns alkalinity or null if not set
     */
    getAlkalinity: () => AlkalinityValue | null;
    /**
     * Sets alkalinity
     *
     * @param value alkalinity value
     */
    setAlkalinity: (value: AlkalinityValue | null) => void;
    /**
     * Returns strike water
     *
     * @returns strike water or null if not set
     */
    getStrikeWater: () => VolumeValue;
    /**
     * Sets strike water
     *
     * @param value strike water value
     */
    setStrikeWater: (value: VolumeValue) => void;
    /**
     * Returns sparge water
     *
     * @returns sparge water or null if not set
     */
    getSpargeWater: () => VolumeValue;
    /**
     * Sets sparge water
     *
     * @param value sparge water value
     */
    setSpargeWater: (value: VolumeValue) => void;
    /**
     * Returns grist weight
     *
     * @returns grist weight or null if not set
     */
    getGristWeight: () => MassValue;
    /**
     * Sets grist weight
     *
     * @param value grist weight value
     */
    setGristWeight: (value: MassValue) => void;
    /**
     * Returns beer color
     *
     * @returns beer color or null if not set
     */
    getBeerColor: () => BeerColorValue;
    /**
     * Sets beer color
     *
     * @param value beer color value
     */
    setBeerColor: (value: BeerColorValue) => void;
    /**
     * Returns mash thickness
     *
     * @returns mash thickness
     */
    getMashThickness: () => DensityValue;
    /**
     * Returns total water
     *
     * @returns total water
     */
    getTotalWater: () => VolumeValue;
    /**
     * Returns gypsum
     *
     * @returns gypsum or null if not set
     */
    getGypsum: () => MassValue;
    /**
     * Sets gypsum
     *
     * @param value gypsum value
     */
    setGypsum: (value: MassValue) => void;
    /**
     * Returns epsom
     *
     * @returns epsom or null if not set
     */
    getEpsom: () => MassValue;
    /**
     * Sets epsom
     *
     * @param value epsom value
     */
    setEpsom: (value: MassValue) => void;
    /**
     * Returns tablesalt
     *
     * @returns tablesalt or null if not set
     */
    getTableSalt: () => MassValue;
    /**
     * Sets tablesalt
     *
     * @param value tablesalt value
     */
    setTableSalt: (value: MassValue) => void;
    /**
     * Returns bakingsoda
     *
     * @returns bakingsoda or null if not set
     */
    getBakingSoda: () => MassValue;
    /**
     * Sets bakingsoda
     *
     * @param value bakingsoda value
     */
    setBakingSoda: (value: MassValue) => void;
    /**
     * Returns magnesiumchloride
     *
     * @returns magnesiumchloride or null if not set
     */
    getMagnesiumChloride: () => MassValue;
    /**
     * Sets magnesiumchloride
     *
     * @param value magnesiumchloride value
     */
    setMagnesiumChloride: (value: MassValue) => void;
    /**
     * Returns calciumchloride
     *
     * @returns calciumchloride or null if not set
     */
    getCalciumChloride: () => MassValue;
    /**
     * Sets calciumchloride
     *
     * @param value calciumchloride value
     */
    setCalciumChloride: (value: MassValue) => void;
    /**
     * Returns undissolved chalk
     *
     * @returns undissolved chalk or null if not set
     */
    getChalkUndissolved: () => MassValue;
    /**
     * Sets undissolved chalk
     *
     * @param value undissolved chalk value
     */
    setChalkUndissolved: (value: MassValue) => void;
    /**
     * Returns dissolved chalk
     *
     * @returns dissolved chalk or null if not set
     */
    getChalkDissolved: () => MassValue;
    /**
     * Sets dissolved chalk
     *
     * @param value dissolved chalk value
     */
    setChalkDissolved: (value: MassValue) => void;
    /**
     * Returns lactic acid
     *
     * @param strength returned lactic acid strength as percents. Defaults to 88 %
     * @returns lactic acid or null if not set
     */
    getLacticAcid: (strength?: number) => VolumeValue;
    /**
     * Sets lactic acid
     *
     * @param value lactic acid value
     * @param strength lactic acid strength as percents. Defaults to 88 %
     */
    setLacticAcid: (value: VolumeValue | null, strength?: number) => void;
    /**
     * Returns phosphoric acid
     *
     * @param strength returned phosphoric acid strength as percents. Defaults to 10 %
     * @returns phosphoric acid or null if not set
     */
    getPhosphoricAcid: (strength?: number) => VolumeValue;
    /**
     * Sets phosphoric acid
     *
     * @param value phosphoric acid value
     * @param strength phosphoric acid strength as percents. Defaults to 10 %
     */
    setPhosphoricAcid: (value: VolumeValue | null, strength?: number) => void;
    /**
     * Returns acid malt
     *
     * @param strength returned acid malt strength as percents. Defaults to 3 %
     * @returns acid malt or null if not set
     */
    getAcidMalt: (strength?: number) => MassValue;
    /**
     * Sets acid malt
     *
     * @param value acid malt value
     * @param strength acid malt strength as percents. Defaults to 3 %
     */
    setAcidMalt: (value: MassValue | null, strength?: number) => void;
    /**
     * Returns water ion mass concentrations after added salts
     *
     * @param waterVolume volume of water the ions are beign observed
     * @returns water ion mass concentrations after added salts
     */
    getIonsAfterSalts(waterVolume: VolumeValue): Ions;
    /**
     * Returns water ion mass concentration changes caused by added salts
     *
     * @param waterVolume volume of water the changes are observed
     * @returns water ion mass concentration changes caused by added salts
     */
    getIonSaltChanges(waterVolume: VolumeValue): Ions;
    /**
     * Returns ion balance.
     *
     * Ion balance gives the ion balance in %. Ideally it should be 0 (i.e. there are as many equivalents of cations as there are anions)
     * but if the water contains a substantial amount of ions that are not listed here (i.e. Potassium or Phosphates), the ions may not add up
     *
     * @returns ion balance
     */
    getIonBalance(): number;
    /**
     * Estimates distilled water mash pH at 25 C / 77 F using beer color and roasted percent
     *
     * @return Estimated distilled water mash pH at 25 C
     */
    estimateDistilledWaterMashPh: () => PhValue;
    /**
     * Calculates mash pH change from acid additions
     *
     * @returns mash pH change from acid additions
     */
    getMashPhChangeFromAcidAdditions: () => PhValue;
    /**
     * Calculates mash pH change from salt additions
     *
     * @returns mash pH change from salt additions
     */
    getPhChangeFromSalts: () => PhValue | null;
    /**
     * Sets used water treatment method
     *
     * @param waterTreatment water treatment method
     */
    setWaterTreatment(waterTreatment: WaterTreatment): void;
    /**
     * Returns used water treatment method instance
     *
     * @return used water treatment method instance
     */
    getWaterTreatment: () => WaterTreatment | null;
    /**
     * Returns pH change after water treatment and salt additions
     *
     * @returns pH change after water treatment and salt additions
     */
    getWaterTreatmentPhChange: () => PhValue | null;
    /**
     * Returns pH change from base water
     *
     * @returns pH change from base water
     */
    getPhChangeFromBaseWater: () => PhValue | null;
    /**
     * Returns pH change after water treatment and salt and acid additions
     *
     * @returns pH change after water treatment and salt and acid additions
     */
    getOverallPhChange: () => PhValue | null;
    /**
     * Calculates mash pH change from acid malt
     *
     * @returns mash pH change from acid malt
     */
    private getMashPhChangeFromAcidMalt;
    /**
     * Calculates required amount of lactic acid to lower pH by given amount.
     *
     * If pH delta is positive, returned amount will be 0
     *
     * @param phDelta required delta of pH
     * @returns required amount of lactic acid to lower pH by given amount.
     */
    getRequiredLacticAcidForPhChange(phDelta: PhValue): VolumeValue;
    /**
     * Calculates required amount of phosphoric acid to lower pH by given amount.
     *
     * If pH delta is positive, returned amount will be 0
     *
     * @param phDelta required delta of pH
     * @returns required amount of phosphoric acid to lower pH by given amount.
     */
    getRequiredPhosporicAcidForPhChange(phDelta: PhValue): VolumeValue;
    /**
     * Calculates mash pH change from lacic acid
     *
     * @returns mash pH change from lacic acid
     */
    private getMashPhChangeFromLacticAcid;
    /**
     * Calculates mash pH change from weight of 100% lacic acid
     *
     * @returns mash pH change from weight of 100% lacic acid
     */
    private getMashPhChangeFromLacticAcidWeight;
    /**
     * Calculates mash pH change from phosporic acid
     *
     * @returns mash pH change from phosporic acid
     */
    private getMashPhChangeFromPhosporicAcid;
    /**
     * Converts volume value from given from strength to given to strength
     *
     * e.g. from 88% lactic acid to 85% lactic acid
     *
     * @param value value
     * @param fromStrength initial strength
     * @param toStrength target strength
     * @returns converted volume value
     */
    private convertVolumeToStrength;
    /**
     * Converts mass value from given from strength to given to strength
     *
     * e.g. from 3% acid malt to 2% acid malt
     *
     * @param value value
     * @param fromStrength initial strength
     * @param toStrength target strength
     * @returns converted volume value
     */
    private convertMassToStrength;
    /**
     * Estimates amount of calcium and magnesium from GH
     */
    private estimateCalciumAndMagnesiumFromGh;
    /**
     * Adds ion changes by given salt
     *
     * @param result resulting ions
     * @param waterVolume volume of water where changes take place
     * @param salt amount of salt
     * @param saltIons salt ion properties
     */
    private addSaltIonChanges;
}
