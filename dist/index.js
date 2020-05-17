"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const units_1 = require("./units");
const consts_1 = __importDefault(require("./consts"));
const salt_ions_1 = __importDefault(require("./salt-ions"));
/**
 * Water profile calculator
 */
class WaterCalculator {
    constructor() {
        this.assumedMgContributionToTestedGh = consts_1.default.ASSUMED_MG_CONTRIBUTION_TO_TESTED_GH;
        this.maltRoastedPercent = null;
        this.gh = null;
        this.kh = null;
        this.residualAlkalinity = null;
        this.calcium = null;
        this.magnesium = null;
        this.sodium = null;
        this.sulfate = null;
        this.chloride = null;
        this.bicarbonate = null;
        this.alkalinity = null;
        this.strikeWater = new units_1.VolumeValue("l", 0);
        this.spargeWater = new units_1.VolumeValue("l", 0);
        this.gristWeight = new units_1.MassValue("kg", 0);
        this.beerColor = null;
        this.gypsum = null;
        this.epsom = null;
        this.tableSalt = null;
        this.calciumChloride = null;
        this.magnesiumChloride = null;
        this.bakingSoda = null;
        this.chalkUndissolved = null;
        this.chalkDissolved = null;
        this.lacticAcid = null;
        this.phosphoricAcid = null;
        this.acidMalt = null;
        this.waterTreatment = null;
        /**
         * Returns GH
         *
         * @returns GH or null if not set
         */
        this.getGH = () => {
            return this.gh;
        };
        /**
         * Sets GH
         *
         * @param value GH value
         */
        this.setGH = (value) => {
            this.gh = value;
            this.estimateCalciumAndMagnesiumFromGh();
        };
        /**
         * Returns KH
         *
         * @returns KH or null if not set
         */
        this.getKH = () => {
            return this.kh;
        };
        /**
         * Sets KH
         *
         * @param value KH value
         */
        this.setKH = (value) => {
            this.kh = value;
            if (value) {
                this.setAlkalinity(new units_1.AlkalinityValue("mg/l", value.getValue("ppmCaCO3")));
            }
        };
        /**
         * Returns residual alkalinity
         *
         * @returns residual alkalinity or null if not set
         */
        this.getResidualAlkalinity = () => {
            if (this.residualAlkalinity) {
                return this.residualAlkalinity;
            }
            const alkalinity = this.getAlkalinity();
            const calcium = this.getCalcium();
            const magnesium = this.getMagnesium();
            if (alkalinity == null || calcium == null || magnesium == null) {
                return null;
            }
            return new units_1.AlkalinityValue("dH", this.getAlkalinity().getValue("dH") - this.getCalcium().getValue("dH") / 3.5 - this.getMagnesium().getValue("dH") / 7);
        };
        /**
         * Sets residual alkalinity
         *
         * @param value residual alkalinity value
         */
        this.setResidualAlkalinity = (value) => {
            this.residualAlkalinity = value;
        };
        /**
         * Returns assumed MG contribution to tested gH
         *
         * Defaults to 30 %
         *
         * @returns assumed MG contribution to tested gH
         */
        this.getAssumedMgContributionToTestedGh = () => {
            return this.assumedMgContributionToTestedGh;
        };
        /**
         * Sets the assumed MG contribution to tested gH
         *
         * @param assumedMgContributionToTestedGh assumed MG contribution to tested gH
         */
        this.setAssumedMgContributionToTestedGh = (assumedMgContributionToTestedGh) => {
            this.assumedMgContributionToTestedGh = assumedMgContributionToTestedGh;
            this.estimateCalciumAndMagnesiumFromGh();
        };
        /**
         * Returns calcium
         *
         * @returns calcium or null if not set
         */
        this.getCalcium = () => {
            return this.calcium;
        };
        /**
         * Sets calcium
         *
         * @param value calcium value
         */
        this.setCalcium = (value) => {
            this.calcium = value;
        };
        /**
         * Returns magnesium
         *
         * @returns magnesium or null if not set
         */
        this.getMagnesium = () => {
            return this.magnesium;
        };
        /**
         * Sets magnesium
         *
         * @param value magnesium value
         */
        this.setMagnesium = (value) => {
            this.magnesium = value;
        };
        /**
         * Returns sodium
         *
         * @returns sodium or null if not set
         */
        this.getSodium = () => {
            return this.sodium;
        };
        /**
         * Sets sodium
         *
         * @param value sodium value
         */
        this.setSodium = (value) => {
            this.sodium = value;
        };
        /**
         * Returns sulfate
         *
         * @returns sulfate or null if not set
         */
        this.getSulfate = () => {
            return this.sulfate;
        };
        /**
         * Sets sulfate
         *
         * @param value sulfate value
         */
        this.setSulfate = (value) => {
            this.sulfate = value;
        };
        /**
         * Returns chloride
         *
         * @returns chloride or null if not set
         */
        this.getChloride = () => {
            return this.chloride;
        };
        /**
         * Sets chloride
         *
         * @param value chloride value
         */
        this.setChloride = (value) => {
            this.chloride = value;
        };
        /**
         * Returns bicarbonate
         *
         * @returns bicarbonate or null if not set
         */
        this.getBicarbonate = () => {
            if (this.bicarbonate) {
                return this.bicarbonate;
            }
            const alkalinity = this.getAlkalinity();
            if (alkalinity) {
                return new units_1.BicarbonateValue("mg/l", alkalinity.getValue("mg/l") * 61 / 50);
            }
            return null;
        };
        /**
         * Sets bicarbonate
         *
         * @param value bicarbonate value
         */
        this.setBicarbonate = (value) => {
            this.bicarbonate = value;
        };
        /**
         * Returns alkalinity either from given alkalinity value or
         * value derived from given bicarbonate value
         *
         * @returns alkalinity or null if not set
         */
        this.getAlkalinity = () => {
            if (this.alkalinity != null) {
                return this.alkalinity;
            }
            if (this.bicarbonate != null) {
                return new units_1.AlkalinityValue("mg/l", this.bicarbonate.getValue("mg/l") * 50 / 61);
            }
            return null;
        };
        /**
         * Sets alkalinity
         *
         * @param value alkalinity value
         */
        this.setAlkalinity = (value) => {
            this.alkalinity = value;
        };
        /**
         * Returns strike water
         *
         * @returns strike water or null if not set
         */
        this.getStrikeWater = () => {
            return this.strikeWater;
        };
        /**
         * Sets strike water
         *
         * @param value strike water value
         */
        this.setStrikeWater = (value) => {
            this.strikeWater = value;
        };
        /**
         * Returns sparge water
         *
         * @returns sparge water or null if not set
         */
        this.getSpargeWater = () => {
            return this.spargeWater;
        };
        /**
         * Sets sparge water
         *
         * @param value sparge water value
         */
        this.setSpargeWater = (value) => {
            this.spargeWater = value;
        };
        /**
         * Returns grist weight
         *
         * @returns grist weight or null if not set
         */
        this.getGristWeight = () => {
            return this.gristWeight;
        };
        /**
         * Sets grist weight
         *
         * @param value grist weight value
         */
        this.setGristWeight = (value) => {
            this.gristWeight = value;
        };
        /**
         * Returns beer color
         *
         * @returns beer color or null if not set
         */
        this.getBeerColor = () => {
            return this.beerColor;
        };
        /**
         * Sets beer color
         *
         * @param value beer color value
         */
        this.setBeerColor = (value) => {
            this.beerColor = value;
        };
        /**
         * Returns mash thickness
         *
         * @returns mash thickness
         */
        this.getMashThickness = () => {
            const strikeLiters = this.getStrikeWater().getValue("l");
            const gristWeight = this.getGristWeight().getValue("kg");
            return new units_1.DensityValue("l/kg", gristWeight == 0 || gristWeight == 0 ? 0 : strikeLiters / gristWeight);
        };
        /**
         * Returns total water
         *
         * @returns total water
         */
        this.getTotalWater = () => {
            const strikeLiters = this.strikeWater != null ? this.strikeWater.getValue("l") : 0;
            const spargeLiters = this.spargeWater != null ? this.spargeWater.getValue("l") : 0;
            return new units_1.VolumeValue("l", spargeLiters + strikeLiters);
        };
        /**
         * Returns gypsum
         *
         * @returns gypsum or null if not set
         */
        this.getGypsum = () => {
            return this.gypsum;
        };
        /**
         * Sets gypsum
         *
         * @param value gypsum value
         */
        this.setGypsum = (value) => {
            this.gypsum = value;
        };
        /**
         * Returns epsom
         *
         * @returns epsom or null if not set
         */
        this.getEpsom = () => {
            return this.epsom;
        };
        /**
         * Sets epsom
         *
         * @param value epsom value
         */
        this.setEpsom = (value) => {
            this.epsom = value;
        };
        /**
         * Returns tablesalt
         *
         * @returns tablesalt or null if not set
         */
        this.getTableSalt = () => {
            return this.tableSalt;
        };
        /**
         * Sets tablesalt
         *
         * @param value tablesalt value
         */
        this.setTableSalt = (value) => {
            this.tableSalt = value;
        };
        /**
         * Returns bakingsoda
         *
         * @returns bakingsoda or null if not set
         */
        this.getBakingSoda = () => {
            return this.bakingSoda;
        };
        /**
         * Sets bakingsoda
         *
         * @param value bakingsoda value
         */
        this.setBakingSoda = (value) => {
            this.bakingSoda = value;
        };
        /**
         * Returns magnesiumchloride
         *
         * @returns magnesiumchloride or null if not set
         */
        this.getMagnesiumChloride = () => {
            return this.magnesiumChloride;
        };
        /**
         * Sets magnesiumchloride
         *
         * @param value magnesiumchloride value
         */
        this.setMagnesiumChloride = (value) => {
            this.magnesiumChloride = value;
        };
        /**
         * Returns calciumchloride
         *
         * @returns calciumchloride or null if not set
         */
        this.getCalciumChloride = () => {
            return this.calciumChloride;
        };
        /**
         * Sets calciumchloride
         *
         * @param value calciumchloride value
         */
        this.setCalciumChloride = (value) => {
            this.calciumChloride = value;
        };
        /**
         * Returns undissolved chalk
         *
         * @returns undissolved chalk or null if not set
         */
        this.getChalkUndissolved = () => {
            return this.chalkUndissolved;
        };
        /**
         * Sets undissolved chalk
         *
         * @param value undissolved chalk value
         */
        this.setChalkUndissolved = (value) => {
            this.chalkUndissolved = value;
        };
        /**
         * Returns dissolved chalk
         *
         * @returns dissolved chalk or null if not set
         */
        this.getChalkDissolved = () => {
            return this.chalkDissolved;
        };
        /**
         * Sets dissolved chalk
         *
         * @param value dissolved chalk value
         */
        this.setChalkDissolved = (value) => {
            this.chalkDissolved = value;
        };
        /**
         * Returns lactic acid
         *
         * @param strength returned lactic acid strength as percents. Defaults to 88 %
         * @returns lactic acid or null if not set
         */
        this.getLacticAcid = (strength) => {
            return this.convertVolumeToStrength(this.lacticAcid, 88, strength || 88);
        };
        /**
         * Sets lactic acid
         *
         * @param value lactic acid value
         * @param strength lactic acid strength as percents. Defaults to 88 %
         */
        this.setLacticAcid = (value, strength) => {
            this.lacticAcid = this.convertVolumeToStrength(value, strength || 88, 88);
        };
        /**
         * Returns phosphoric acid
         *
         * @param strength returned phosphoric acid strength as percents. Defaults to 10 %
         * @returns phosphoric acid or null if not set
         */
        this.getPhosphoricAcid = (strength) => {
            return this.convertVolumeToStrength(this.phosphoricAcid, 10, strength || 10);
        };
        /**
         * Sets phosphoric acid
         *
         * @param value phosphoric acid value
         * @param strength phosphoric acid strength as percents. Defaults to 10 %
         */
        this.setPhosphoricAcid = (value, strength) => {
            this.phosphoricAcid = this.convertVolumeToStrength(value, strength || 10, 10);
        };
        /**
         * Returns acid malt
         *
         * @param strength returned acid malt strength as percents. Defaults to 3 %
         * @returns acid malt or null if not set
         */
        this.getAcidMalt = (strength) => {
            return this.convertMassToStrength(this.acidMalt, 3, strength || 3);
        };
        /**
         * Sets acid malt
         *
         * @param value acid malt value
         * @param strength acid malt strength as percents. Defaults to 3 %
         */
        this.setAcidMalt = (value, strength) => {
            this.acidMalt = this.convertMassToStrength(value, strength || 3, 3);
        };
        /**
         * Estimates distilled water mash pH at 25 C / 77 F using beer color and roasted percent
         *
         * @return Estimated distilled water mash pH at 25 C
         */
        this.estimateDistilledWaterMashPh = () => {
            const ph0Srm = 5.6;
            const sC = 0.21;
            const sR = 0.06;
            const p = 12;
            const srm = this.getBeerColor().getValue("SRM");
            const r = this.getMaltRoastedPercent() / 100;
            return new units_1.PhValue("pH", ph0Srm - srm * (sC * (1 - r) + sR * r) / p);
        };
        /**
         * Calculates mash pH change from acid additions
         *
         * @returns mash pH change from acid additions
         */
        this.getMashPhChangeFromAcidAdditions = () => {
            return new units_1.PhValue("pH", this.getMashPhChangeFromPhosporicAcid() + this.getMashPhChangeFromLacticAcid() + this.getMashPhChangeFromAcidMalt());
        };
        /**
         * Calculates mash pH change from salt additions
         *
         * @returns mash pH change from salt additions
         */
        this.getPhChangeFromSalts = () => {
            const ionsFromSalts = this.getIonsAfterSalts(this.getStrikeWater());
            const strikeWater = this.getStrikeWater();
            const gristWeight = this.getGristWeight();
            const calcium = ionsFromSalts.calcium.subValue(this.getCalcium());
            const magnesium = ionsFromSalts.magnesium.subValue(this.getMagnesium());
            const bicarbonate = ionsFromSalts.bicarbonate.subValue(this.getBicarbonate());
            const caHardnessFromSalts = (calcium.getValue("mg/l") || 0) / 20;
            const mgHardnessFromSalts = (magnesium.getValue("mg/l") || 0) / 12.15;
            const alkalinityFromSalts = (bicarbonate.getValue("mg/l") || 0) / 61;
            const residualAlkalinityFromSalts = alkalinityFromSalts - caHardnessFromSalts / 3.5 - mgHardnessFromSalts / 7;
            const totalResidualAlkalinityFromSalts = residualAlkalinityFromSalts * strikeWater.getValue("l");
            return new units_1.PhValue("pH", totalResidualAlkalinityFromSalts / consts_1.default.MASH_BUFFER_CAPACITY_FOR_WATER_RESIDUAL_ALKALINITY / gristWeight.getValue("kg"));
        };
        /**
         * Returns used water treatment method instance
         *
         * @return used water treatment method instance
         */
        this.getWaterTreatment = () => {
            return this.waterTreatment;
        };
        /**
         * Returns pH change after water treatment and salt additions
         *
         * @returns pH change after water treatment and salt additions
         */
        this.getWaterTreatmentPhChange = () => {
            if (this.waterTreatment) {
                return this.waterTreatment.getPhChange();
            }
            return null;
        };
        /**
         * Returns pH change from base water
         *
         * @returns pH change from base water
         */
        this.getPhChangeFromBaseWater = () => {
            const strikeWater = this.getStrikeWater();
            const gristWeight = this.getGristWeight();
            const residualAlkalinity = this.getResidualAlkalinity();
            if (!strikeWater || !gristWeight || !residualAlkalinity) {
                return null;
            }
            const totalResidualAlkalinityInBaseMashWater = (strikeWater.getValue("l") * residualAlkalinity.getValue("mg/l")) / 50;
            return new units_1.PhValue("pH", totalResidualAlkalinityInBaseMashWater / gristWeight.getValue("kg") / consts_1.default.MASH_BUFFER_CAPACITY_FOR_WATER_RESIDUAL_ALKALINITY);
        };
        /**
         * Returns pH change after water treatment and salt and acid additions
         *
         * @returns pH change after water treatment and salt and acid additions
         */
        this.getOverallPhChange = () => {
            var _a;
            const result = this.getPhChangeFromBaseWater();
            if (this.waterTreatment) {
                result.addValue((_a = this.waterTreatment) === null || _a === void 0 ? void 0 : _a.getPhChange());
            }
            else {
                result.addValue(this.getPhChangeFromSalts());
            }
            result.addValue(this.getMashPhChangeFromAcidAdditions());
            return result;
        };
        /**
         * Calculates mash pH change from acid malt
         *
         * @returns mash pH change from acid malt
         */
        this.getMashPhChangeFromAcidMalt = () => {
            var _a;
            const lacticAcidFromAcidMalt = ((_a = this.getAcidMalt(100)) === null || _a === void 0 ? void 0 : _a.getValue("g")) || 0;
            const totalLacticAcidWeight = new units_1.MassValue("g", lacticAcidFromAcidMalt);
            return this.getMashPhChangeFromLacticAcidWeight(totalLacticAcidWeight);
        };
        /**
         * Calculates mash pH change from lacic acid
         *
         * @returns mash pH change from lacic acid
         */
        this.getMashPhChangeFromLacticAcid = () => {
            var _a;
            const lacticAcidStrength = 88;
            const totalLacticAcidWeight = (((_a = this.getLacticAcid(lacticAcidStrength)) === null || _a === void 0 ? void 0 : _a.getValue("ml")) || 0) * consts_1.default.LACTIC_ACID_DENSITY_88 * (lacticAcidStrength / 100);
            return this.getMashPhChangeFromLacticAcidWeight(new units_1.MassValue("g", totalLacticAcidWeight));
        };
        /**
         * Calculates mash pH change from weight of 100% lacic acid
         *
         * @returns mash pH change from weight of 100% lacic acid
         */
        this.getMashPhChangeFromLacticAcidWeight = (totalLacticAcidWeight) => {
            const totalAcidMaltPower = totalLacticAcidWeight.getValue("mg") / consts_1.default.LACTIC_ACID_MOLAR_WEIGHT;
            return -totalAcidMaltPower / consts_1.default.MASH_BUFFER_CAPACITY_FOR_ACID_ADDITIONS / this.getGristWeight().getValue("kg");
        };
        /**
         * Calculates mash pH change from phosporic acid
         *
         * @returns mash pH change from phosporic acid
         */
        this.getMashPhChangeFromPhosporicAcid = () => {
            var _a;
            const phosphoricAcidStrength = 10;
            const phosphoricAcidDensity = phosphoricAcidStrength / 85 * (consts_1.default.PHOSPHORIC_ACID_DENSITY_85 - 1) + 1;
            const phosporicAcidSolutionWeight = new units_1.MassValue("g", (((_a = this.getPhosphoricAcid(phosphoricAcidStrength)) === null || _a === void 0 ? void 0 : _a.getValue("ml")) || 0) * phosphoricAcidDensity);
            const phosphoricAcidFromLiquidPhosphoricAcid = phosphoricAcidStrength / 100 * phosporicAcidSolutionWeight.getValue("mg");
            const phosphoricAcidPower = phosphoricAcidFromLiquidPhosphoricAcid / consts_1.default.PHOSPHORIC_ACID_MOLECULAR_WEIGHT;
            return -phosphoricAcidPower / consts_1.default.MASH_BUFFER_CAPACITY_FOR_ACID_ADDITIONS / this.getGristWeight().getValue("kg");
        };
        /**
         * Estimates amount of calcium and magnesium from GH
         */
        this.estimateCalciumAndMagnesiumFromGh = () => {
            if (this.gh == null) {
                return;
            }
            this.setCalcium(new units_1.CalciumValue("mg/l", this.gh.getValue("ppmCaCO3") * (1 - this.assumedMgContributionToTestedGh / 100) / 17.8 * 7.14));
            this.setMagnesium(new units_1.MagnesiumValue("mg/l", this.gh.getValue("ppmCaCO3") * (this.assumedMgContributionToTestedGh / 100) / 17.8 * 4.33));
        };
    }
    /**
     * Returns malt roasted percent
     *
     * The “roasted %” allows you to specify how much of the beer's color is contributed by roasted malts.
     * E.g. if a beer is brewed with 90% 2-row, 7% 60 Lovibond cara malts and 3% 500 Lovibond roasted malts,
     * the roasted malt portion of the color is 3%*500/(7%*60+3%*500)=78% (this neglects the color from the 2-row).
     *
     * @returns malt roasted percent
     */
    getMaltRoastedPercent() {
        return this.maltRoastedPercent;
    }
    /**
     * Sets malt roasted percent
     *
     * @returns malt roasted percent
     */
    setMaltRoastedPercent(maltRoastedPercent) {
        this.maltRoastedPercent = maltRoastedPercent;
    }
    /**
     * Returns water ion mass concentrations after added salts
     *
     * @param waterVolume volume of water the ions are beign observed
     * @returns water ion mass concentrations after added salts
     */
    getIonsAfterSalts(waterVolume) {
        var _a, _b, _c, _d, _e, _f;
        const result = this.getIonSaltChanges(waterVolume);
        result.calcium.add("mg/l", ((_a = this.getCalcium()) === null || _a === void 0 ? void 0 : _a.getValue("mg/l")) || 0);
        result.chloride.add("mg/l", ((_b = this.getChloride()) === null || _b === void 0 ? void 0 : _b.getValue("mg/l")) || 0);
        result.magnesium.add("mg/l", ((_c = this.getMagnesium()) === null || _c === void 0 ? void 0 : _c.getValue("mg/l")) || 0);
        result.sodium.add("mg/l", ((_d = this.getSodium()) === null || _d === void 0 ? void 0 : _d.getValue("mg/l")) || 0);
        result.sulfate.add("mg/l", ((_e = this.getSulfate()) === null || _e === void 0 ? void 0 : _e.getValue("mg/l")) || 0);
        result.bicarbonate.add("mg/l", ((_f = this.getBicarbonate()) === null || _f === void 0 ? void 0 : _f.getValue("mg/l")) || 0);
        return result;
    }
    /**
     * Returns water ion mass concentration changes caused by added salts
     *
     * @param waterVolume volume of water the changes are observed
     * @returns water ion mass concentration changes caused by added salts
     */
    getIonSaltChanges(waterVolume) {
        const result = {
            calcium: new units_1.CalciumValue("mg/l", 0),
            chloride: new units_1.ChlorideValue("mg/l", 0),
            magnesium: new units_1.MagnesiumValue("mg/l", 0),
            sodium: new units_1.SodiumValue("mg/l", 0),
            sulfate: new units_1.SulfateValue("mg/l", 0),
            bicarbonate: new units_1.BicarbonateValue("mg/l", 0)
        };
        if (waterVolume && waterVolume.getValue("l") > 0) {
            this.addSaltIonChanges(result, waterVolume, this.gypsum, salt_ions_1.default.gypsum);
            this.addSaltIonChanges(result, waterVolume, this.epsom, salt_ions_1.default.epsom);
            this.addSaltIonChanges(result, waterVolume, this.tableSalt, salt_ions_1.default.tableSalt);
            this.addSaltIonChanges(result, waterVolume, this.calciumChloride, salt_ions_1.default.calciumChloride);
            this.addSaltIonChanges(result, waterVolume, this.magnesiumChloride, salt_ions_1.default.magnesiumChloride);
            this.addSaltIonChanges(result, waterVolume, this.bakingSoda, salt_ions_1.default.bakingSoda);
            this.addSaltIonChanges(result, waterVolume, this.chalkUndissolved, salt_ions_1.default.chalkUndissolved);
            this.addSaltIonChanges(result, waterVolume, this.chalkDissolved, salt_ions_1.default.chalkDissolved);
        }
        return result;
    }
    /**
     * Returns ion balance.
     *
     * Ion balance gives the ion balance in %. Ideally it should be 0 (i.e. there are as many equivalents of cations as there are anions)
     * but if the water contains a substantial amount of ions that are not listed here (i.e. Potassium or Phosphates), the ions may not add up
     *
     * @returns ion balance
     */
    getIonBalance() {
        var _a, _b, _c, _d, _e;
        const calciumDh = ((_a = this.getCalcium()) === null || _a === void 0 ? void 0 : _a.getValue("dH")) || 0;
        const magnesiumDh = ((_b = this.getMagnesium()) === null || _b === void 0 ? void 0 : _b.getValue("dH")) || 0;
        const sodiumDh = ((_c = this.getSodium()) === null || _c === void 0 ? void 0 : _c.getValue("dH")) || 0;
        const sulfateDh = ((_d = this.getSulfate()) === null || _d === void 0 ? void 0 : _d.getValue("dH")) || 0;
        const chlorideDh = ((_e = this.getChloride()) === null || _e === void 0 ? void 0 : _e.getValue("dH")) || 0;
        const alkalinityDh = this.getAlkalinity().getValue("dH");
        const ionDhs = calciumDh + magnesiumDh + sodiumDh + sulfateDh + chlorideDh + alkalinityDh;
        if (ionDhs == 0) {
            return 0;
        }
        return (calciumDh + magnesiumDh + sodiumDh - sulfateDh - chlorideDh - alkalinityDh) / ionDhs * 50;
    }
    /**
     * Sets used water treatment method
     *
     * @param waterTreatment water treatment method
     */
    setWaterTreatment(waterTreatment) {
        this.waterTreatment = waterTreatment;
        this.waterTreatment.init(this);
    }
    /**
     * Calculates required amount of lactic acid to lower pH by given amount.
     *
     * If pH delta is positive, returned amount will be 0
     *
     * @param phDelta required delta of pH
     * @returns required amount of lactic acid to lower pH by given amount.
     */
    getRequiredLacticAcidForPhChange(phDelta) {
        if (phDelta.getValue("pH") >= 0) {
            return new units_1.VolumeValue("ml", 0);
        }
        const lacticAcidStrength = 88;
        return new units_1.VolumeValue("μl", -phDelta.getValue("pH") * this.getGristWeight().getValue("kg") * consts_1.default.MASH_BUFFER_CAPACITY_FOR_ACID_ADDITIONS * consts_1.default.LACTIC_ACID_MOLAR_WEIGHT * 100 / lacticAcidStrength / consts_1.default.LACTIC_ACID_DENSITY_88);
    }
    /**
     * Calculates required amount of phosphoric acid to lower pH by given amount.
     *
     * If pH delta is positive, returned amount will be 0
     *
     * @param phDelta required delta of pH
     * @returns required amount of phosphoric acid to lower pH by given amount.
     */
    getRequiredPhosporicAcidForPhChange(phDelta) {
        if (phDelta.getValue("pH") >= 0) {
            return new units_1.VolumeValue("ml", 0);
        }
        const phosphoricAcidStrength = 10;
        return new units_1.VolumeValue("μl", phDelta.getValue("pH") * this.getGristWeight().getValue("kg") * consts_1.default.MASH_BUFFER_CAPACITY_FOR_ACID_ADDITIONS * consts_1.default.PHOSPHORIC_ACID_MOLECULAR_WEIGHT * 100 / -phosphoricAcidStrength / (phosphoricAcidStrength / 85 * (consts_1.default.PHOSPHORIC_ACID_DENSITY_85 - 1) + 1));
    }
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
    convertVolumeToStrength(value, fromStrength, toStrength) {
        if (!value || !fromStrength || !toStrength) {
            return value;
        }
        return new units_1.VolumeValue("ml", value.getValue("ml") / (toStrength / fromStrength));
    }
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
    convertMassToStrength(value, fromStrength, toStrength) {
        if (!value || !fromStrength || !toStrength) {
            return value;
        }
        return new units_1.MassValue("g", value.getValue("g") / (toStrength / fromStrength));
    }
    /**
     * Adds ion changes by given salt
     *
     * @param result resulting ions
     * @param waterVolume volume of water where changes take place
     * @param salt amount of salt
     * @param saltIons salt ion properties
     */
    addSaltIonChanges(result, waterVolume, salt, saltIons) {
        if (salt) {
            const saltConcentration = salt.getMassConcentration(waterVolume).getValue("mg/l");
            result.calcium.add("mg/l", saltConcentration * (saltIons.calcium || 0));
            result.chloride.add("mg/l", saltConcentration * (saltIons.chloride || 0));
            result.magnesium.add("mg/l", saltConcentration * (saltIons.magnesium || 0));
            result.sodium.add("mg/l", saltConcentration * (saltIons.sodium || 0));
            result.sulfate.add("mg/l", saltConcentration * (saltIons.sulfate || 0));
            result.bicarbonate.add("mg/l", saltConcentration * (saltIons.bicarbonate || 0));
        }
    }
}
exports.default = WaterCalculator;
//# sourceMappingURL=index.js.map