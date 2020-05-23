"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var units_1 = require("./units");
var consts_1 = __importDefault(require("./consts"));
var salt_ions_1 = __importDefault(require("./salt-ions"));
/**
 * Water profile calculator
 */
var WaterCalculator = /** @class */ (function () {
    function WaterCalculator() {
        var _this = this;
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
        this.getGH = function () {
            return _this.gh;
        };
        /**
         * Sets GH
         *
         * @param value GH value
         */
        this.setGH = function (value) {
            _this.gh = value;
            _this.estimateCalciumAndMagnesiumFromGh();
        };
        /**
         * Returns KH
         *
         * @returns KH or null if not set
         */
        this.getKH = function () {
            return _this.kh;
        };
        /**
         * Sets KH
         *
         * @param value KH value
         */
        this.setKH = function (value) {
            _this.kh = value;
            if (value) {
                _this.setAlkalinity(new units_1.AlkalinityValue("mg/l", value.getValue("ppmCaCO3")));
            }
        };
        /**
         * Returns residual alkalinity
         *
         * @returns residual alkalinity or null if not set
         */
        this.getResidualAlkalinity = function () {
            if (_this.residualAlkalinity) {
                return _this.residualAlkalinity;
            }
            var alkalinity = _this.getAlkalinity();
            var calcium = _this.getCalcium();
            var magnesium = _this.getMagnesium();
            if (alkalinity == null || calcium == null || magnesium == null) {
                return null;
            }
            return new units_1.AlkalinityValue("dH", _this.getAlkalinity().getValue("dH") - _this.getCalcium().getValue("dH") / 3.5 - _this.getMagnesium().getValue("dH") / 7);
        };
        /**
         * Sets residual alkalinity
         *
         * @param value residual alkalinity value
         */
        this.setResidualAlkalinity = function (value) {
            _this.residualAlkalinity = value;
        };
        /**
         * Returns assumed MG contribution to tested gH
         *
         * Defaults to 30 %
         *
         * @returns assumed MG contribution to tested gH
         */
        this.getAssumedMgContributionToTestedGh = function () {
            return _this.assumedMgContributionToTestedGh;
        };
        /**
         * Sets the assumed MG contribution to tested gH
         *
         * @param assumedMgContributionToTestedGh assumed MG contribution to tested gH
         */
        this.setAssumedMgContributionToTestedGh = function (assumedMgContributionToTestedGh) {
            _this.assumedMgContributionToTestedGh = assumedMgContributionToTestedGh;
            _this.estimateCalciumAndMagnesiumFromGh();
        };
        /**
         * Returns calcium
         *
         * @returns calcium or null if not set
         */
        this.getCalcium = function () {
            return _this.calcium;
        };
        /**
         * Sets calcium
         *
         * @param value calcium value
         */
        this.setCalcium = function (value) {
            _this.calcium = value;
        };
        /**
         * Returns magnesium
         *
         * @returns magnesium or null if not set
         */
        this.getMagnesium = function () {
            return _this.magnesium;
        };
        /**
         * Sets magnesium
         *
         * @param value magnesium value
         */
        this.setMagnesium = function (value) {
            _this.magnesium = value;
        };
        /**
         * Returns sodium
         *
         * @returns sodium or null if not set
         */
        this.getSodium = function () {
            return _this.sodium;
        };
        /**
         * Sets sodium
         *
         * @param value sodium value
         */
        this.setSodium = function (value) {
            _this.sodium = value;
        };
        /**
         * Returns sulfate
         *
         * @returns sulfate or null if not set
         */
        this.getSulfate = function () {
            return _this.sulfate;
        };
        /**
         * Sets sulfate
         *
         * @param value sulfate value
         */
        this.setSulfate = function (value) {
            _this.sulfate = value;
        };
        /**
         * Returns chloride
         *
         * @returns chloride or null if not set
         */
        this.getChloride = function () {
            return _this.chloride;
        };
        /**
         * Sets chloride
         *
         * @param value chloride value
         */
        this.setChloride = function (value) {
            _this.chloride = value;
        };
        /**
         * Returns bicarbonate
         *
         * @returns bicarbonate or null if not set
         */
        this.getBicarbonate = function () {
            if (_this.bicarbonate) {
                return _this.bicarbonate;
            }
            var alkalinity = _this.getAlkalinity();
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
        this.setBicarbonate = function (value) {
            _this.bicarbonate = value;
        };
        /**
         * Returns alkalinity either from given alkalinity value or
         * value derived from given bicarbonate value
         *
         * @returns alkalinity or null if not set
         */
        this.getAlkalinity = function () {
            if (_this.alkalinity != null) {
                return _this.alkalinity;
            }
            if (_this.bicarbonate != null) {
                return new units_1.AlkalinityValue("mg/l", _this.bicarbonate.getValue("mg/l") * 50 / 61);
            }
            return null;
        };
        /**
         * Sets alkalinity
         *
         * @param value alkalinity value
         */
        this.setAlkalinity = function (value) {
            _this.alkalinity = value;
        };
        /**
         * Returns strike water
         *
         * @returns strike water or null if not set
         */
        this.getStrikeWater = function () {
            return _this.strikeWater;
        };
        /**
         * Sets strike water
         *
         * @param value strike water value
         */
        this.setStrikeWater = function (value) {
            _this.strikeWater = value;
        };
        /**
         * Returns sparge water
         *
         * @returns sparge water or null if not set
         */
        this.getSpargeWater = function () {
            return _this.spargeWater;
        };
        /**
         * Sets sparge water
         *
         * @param value sparge water value
         */
        this.setSpargeWater = function (value) {
            _this.spargeWater = value;
        };
        /**
         * Returns grist weight
         *
         * @returns grist weight or null if not set
         */
        this.getGristWeight = function () {
            return _this.gristWeight;
        };
        /**
         * Sets grist weight
         *
         * @param value grist weight value
         */
        this.setGristWeight = function (value) {
            _this.gristWeight = value;
        };
        /**
         * Returns beer color
         *
         * @returns beer color or null if not set
         */
        this.getBeerColor = function () {
            return _this.beerColor;
        };
        /**
         * Sets beer color
         *
         * @param value beer color value
         */
        this.setBeerColor = function (value) {
            _this.beerColor = value;
        };
        /**
         * Returns mash thickness
         *
         * @returns mash thickness
         */
        this.getMashThickness = function () {
            var strikeLiters = _this.getStrikeWater().getValue("l");
            var gristWeight = _this.getGristWeight().getValue("kg");
            return new units_1.DensityValue("l/kg", gristWeight == 0 || gristWeight == 0 ? 0 : strikeLiters / gristWeight);
        };
        /**
         * Returns total water
         *
         * @returns total water
         */
        this.getTotalWater = function () {
            var strikeLiters = _this.strikeWater != null ? _this.strikeWater.getValue("l") : 0;
            var spargeLiters = _this.spargeWater != null ? _this.spargeWater.getValue("l") : 0;
            return new units_1.VolumeValue("l", spargeLiters + strikeLiters);
        };
        /**
         * Returns gypsum
         *
         * @returns gypsum or null if not set
         */
        this.getGypsum = function () {
            return _this.gypsum;
        };
        /**
         * Sets gypsum
         *
         * @param value gypsum value
         */
        this.setGypsum = function (value) {
            _this.gypsum = value;
        };
        /**
         * Returns epsom
         *
         * @returns epsom or null if not set
         */
        this.getEpsom = function () {
            return _this.epsom;
        };
        /**
         * Sets epsom
         *
         * @param value epsom value
         */
        this.setEpsom = function (value) {
            _this.epsom = value;
        };
        /**
         * Returns tablesalt
         *
         * @returns tablesalt or null if not set
         */
        this.getTableSalt = function () {
            return _this.tableSalt;
        };
        /**
         * Sets tablesalt
         *
         * @param value tablesalt value
         */
        this.setTableSalt = function (value) {
            _this.tableSalt = value;
        };
        /**
         * Returns bakingsoda
         *
         * @returns bakingsoda or null if not set
         */
        this.getBakingSoda = function () {
            return _this.bakingSoda;
        };
        /**
         * Sets bakingsoda
         *
         * @param value bakingsoda value
         */
        this.setBakingSoda = function (value) {
            _this.bakingSoda = value;
        };
        /**
         * Returns magnesiumchloride
         *
         * @returns magnesiumchloride or null if not set
         */
        this.getMagnesiumChloride = function () {
            return _this.magnesiumChloride;
        };
        /**
         * Sets magnesiumchloride
         *
         * @param value magnesiumchloride value
         */
        this.setMagnesiumChloride = function (value) {
            _this.magnesiumChloride = value;
        };
        /**
         * Returns calciumchloride
         *
         * @returns calciumchloride or null if not set
         */
        this.getCalciumChloride = function () {
            return _this.calciumChloride;
        };
        /**
         * Sets calciumchloride
         *
         * @param value calciumchloride value
         */
        this.setCalciumChloride = function (value) {
            _this.calciumChloride = value;
        };
        /**
         * Returns undissolved chalk
         *
         * @returns undissolved chalk or null if not set
         */
        this.getChalkUndissolved = function () {
            return _this.chalkUndissolved;
        };
        /**
         * Sets undissolved chalk
         *
         * @param value undissolved chalk value
         */
        this.setChalkUndissolved = function (value) {
            _this.chalkUndissolved = value;
        };
        /**
         * Returns dissolved chalk
         *
         * @returns dissolved chalk or null if not set
         */
        this.getChalkDissolved = function () {
            return _this.chalkDissolved;
        };
        /**
         * Sets dissolved chalk
         *
         * @param value dissolved chalk value
         */
        this.setChalkDissolved = function (value) {
            _this.chalkDissolved = value;
        };
        /**
         * Returns lactic acid
         *
         * @param strength returned lactic acid strength as percents. Defaults to 88 %
         * @returns lactic acid or null if not set
         */
        this.getLacticAcid = function (strength) {
            var strengthPercent = strength instanceof units_1.PercentValue ? strength.getValue("%") : strength || 88;
            return _this.convertVolumeToStrength(_this.lacticAcid, 88, strengthPercent);
        };
        /**
         * Sets lactic acid
         *
         * @param value lactic acid value
         * @param strength lactic acid strength as percents. Defaults to 88 %
         */
        this.setLacticAcid = function (value, strength) {
            var strengthPercent = strength instanceof units_1.PercentValue ? strength.getValue("%") : strength || 88;
            _this.lacticAcid = _this.convertVolumeToStrength(value, strengthPercent, 88);
        };
        /**
         * Returns phosphoric acid
         *
         * @param strength returned phosphoric acid strength as percents. Defaults to 10 %
         * @returns phosphoric acid or null if not set
         */
        this.getPhosphoricAcid = function (strength) {
            var strengthPercent = strength instanceof units_1.PercentValue ? strength.getValue("%") : strength || 10;
            return _this.convertVolumeToStrength(_this.phosphoricAcid, 10, strengthPercent);
        };
        /**
         * Sets phosphoric acid
         *
         * @param value phosphoric acid value
         * @param strength phosphoric acid strength as percents. Defaults to 10 %
         */
        this.setPhosphoricAcid = function (value, strength) {
            var strengthPercent = strength instanceof units_1.PercentValue ? strength.getValue("%") : strength || 10;
            _this.phosphoricAcid = _this.convertVolumeToStrength(value, strengthPercent, 10);
        };
        /**
         * Returns acid malt
         *
         * @param strength returned acid malt strength as percents. Defaults to 3 %
         * @returns acid malt or null if not set
         */
        this.getAcidMalt = function (strength) {
            var strengthPercent = strength instanceof units_1.PercentValue ? strength.getValue("%") : strength || 3;
            return _this.convertMassToStrength(_this.acidMalt, 3, strengthPercent);
        };
        /**
         * Sets acid malt
         *
         * @param value acid malt value
         * @param strength acid malt strength as percents. Defaults to 3 %
         */
        this.setAcidMalt = function (value, strength) {
            var strengthPercent = strength instanceof units_1.PercentValue ? strength.getValue("%") : strength || 3;
            _this.acidMalt = _this.convertMassToStrength(value, strengthPercent, 3);
        };
        /**
         * Estimates distilled water mash pH at 25 C / 77 F using beer color and roasted percent
         *
         * @return Estimated distilled water mash pH at 25 C
         */
        this.getEstimatedDistilledWaterMashPh = function () {
            var beerColor = _this.getBeerColor();
            if (!beerColor) {
                return null;
            }
            var ph0Srm = 5.6;
            var sC = 0.21;
            var sR = 0.06;
            var p = 12;
            var srm = beerColor.getValue("SRM");
            var r = _this.getMaltRoastedPercent().getValue("%") / 100;
            return new units_1.PhValue("pH", ph0Srm - srm * (sC * (1 - r) + sR * r) / p);
        };
        /**
         * Calculates mash pH change from acid additions
         *
         * @returns mash pH change from acid additions
         */
        this.getMashPhChangeFromAcidAdditions = function () {
            return new units_1.PhValue("pH", _this.getMashPhChangeFromPhosporicAcid() + _this.getMashPhChangeFromLacticAcid() + _this.getMashPhChangeFromAcidMalt());
        };
        /**
         * Calculates mash pH change from salt additions
         *
         * @returns mash pH change from salt additions
         */
        this.getPhChangeFromSalts = function () {
            var totalWater = _this.getTotalWater();
            var strikeWater = _this.getStrikeWater();
            var ionsFromSalts = _this.getIonsAfterSalts(totalWater);
            var gristWeight = _this.getGristWeight();
            var calcium = ionsFromSalts.calcium.subValue(_this.getCalcium());
            var magnesium = ionsFromSalts.magnesium.subValue(_this.getMagnesium());
            var bicarbonate = ionsFromSalts.bicarbonate.subValue(_this.getBicarbonate());
            var caHardnessFromSalts = (calcium.getValue("mg/l") || 0) / 20;
            var mgHardnessFromSalts = (magnesium.getValue("mg/l") || 0) / 12.15;
            var alkalinityFromSalts = (bicarbonate.getValue("mg/l") || 0) / 61;
            var residualAlkalinityFromSalts = alkalinityFromSalts - caHardnessFromSalts / 3.5 - mgHardnessFromSalts / 7;
            var totalResidualAlkalinityFromSalts = residualAlkalinityFromSalts * strikeWater.getValue("l");
            return new units_1.PhValue("pH", totalResidualAlkalinityFromSalts / consts_1.default.MASH_BUFFER_CAPACITY_FOR_WATER_RESIDUAL_ALKALINITY / gristWeight.getValue("kg"));
        };
        /**
         * Returns used water treatment method instance
         *
         * @return used water treatment method instance
         */
        this.getWaterTreatment = function () {
            return _this.waterTreatment;
        };
        /**
         * Returns pH change after water treatment and salt additions
         *
         * @returns pH change after water treatment and salt additions
         */
        this.getWaterTreatmentPhChange = function () {
            if (_this.waterTreatment) {
                return _this.waterTreatment.getPhChange();
            }
            return null;
        };
        /**
         * Returns pH change from base water
         *
         * @returns pH change from base water
         */
        this.getPhChangeFromBaseWater = function () {
            var strikeWater = _this.getStrikeWater();
            var gristWeight = _this.getGristWeight();
            var residualAlkalinity = _this.getResidualAlkalinity();
            if (!strikeWater || !gristWeight || !residualAlkalinity) {
                return null;
            }
            var totalResidualAlkalinityInBaseMashWater = (strikeWater.getValue("l") * residualAlkalinity.getValue("mg/l")) / 50;
            return new units_1.PhValue("pH", totalResidualAlkalinityInBaseMashWater / gristWeight.getValue("kg") / consts_1.default.MASH_BUFFER_CAPACITY_FOR_WATER_RESIDUAL_ALKALINITY);
        };
        /**
         * Returns pH change after water treatment and salt and acid additions
         *
         * @returns pH change after water treatment and salt and acid additions
         */
        this.getOverallPhChange = function () {
            var _a;
            var result = _this.getPhChangeFromBaseWater();
            if (result) {
                if (_this.waterTreatment) {
                    result.addValue((_a = _this.waterTreatment) === null || _a === void 0 ? void 0 : _a.getPhChange());
                }
                else {
                    result.addValue(_this.getPhChangeFromSalts());
                }
                result.addValue(_this.getMashPhChangeFromAcidAdditions());
            }
            return result;
        };
        /**
         * Calculates mash pH change from acid malt
         *
         * @returns mash pH change from acid malt
         */
        this.getMashPhChangeFromAcidMalt = function () {
            var _a;
            var lacticAcidFromAcidMalt = ((_a = _this.getAcidMalt(100)) === null || _a === void 0 ? void 0 : _a.getValue("g")) || 0;
            var totalLacticAcidWeight = new units_1.MassValue("g", lacticAcidFromAcidMalt);
            return _this.getMashPhChangeFromLacticAcidWeight(totalLacticAcidWeight);
        };
        /**
         * Calculates mash pH change from lacic acid
         *
         * @returns mash pH change from lacic acid
         */
        this.getMashPhChangeFromLacticAcid = function () {
            var _a;
            var lacticAcidStrength = 88;
            var totalLacticAcidWeight = (((_a = _this.getLacticAcid(lacticAcidStrength)) === null || _a === void 0 ? void 0 : _a.getValue("ml")) || 0) * consts_1.default.LACTIC_ACID_DENSITY_88 * (lacticAcidStrength / 100);
            return _this.getMashPhChangeFromLacticAcidWeight(new units_1.MassValue("g", totalLacticAcidWeight));
        };
        /**
         * Calculates mash pH change from weight of 100% lacic acid
         *
         * @returns mash pH change from weight of 100% lacic acid
         */
        this.getMashPhChangeFromLacticAcidWeight = function (totalLacticAcidWeight) {
            var totalAcidMaltPower = totalLacticAcidWeight.getValue("mg") / consts_1.default.LACTIC_ACID_MOLAR_WEIGHT;
            return -totalAcidMaltPower / consts_1.default.MASH_BUFFER_CAPACITY_FOR_ACID_ADDITIONS / _this.getGristWeight().getValue("kg");
        };
        /**
         * Calculates mash pH change from phosporic acid
         *
         * @returns mash pH change from phosporic acid
         */
        this.getMashPhChangeFromPhosporicAcid = function () {
            var _a;
            var phosphoricAcidStrength = 10;
            var phosphoricAcidDensity = phosphoricAcidStrength / 85 * (consts_1.default.PHOSPHORIC_ACID_DENSITY_85 - 1) + 1;
            var phosporicAcidSolutionWeight = new units_1.MassValue("g", (((_a = _this.getPhosphoricAcid(phosphoricAcidStrength)) === null || _a === void 0 ? void 0 : _a.getValue("ml")) || 0) * phosphoricAcidDensity);
            var phosphoricAcidFromLiquidPhosphoricAcid = phosphoricAcidStrength / 100 * phosporicAcidSolutionWeight.getValue("mg");
            var phosphoricAcidPower = phosphoricAcidFromLiquidPhosphoricAcid / consts_1.default.PHOSPHORIC_ACID_MOLECULAR_WEIGHT;
            return -phosphoricAcidPower / consts_1.default.MASH_BUFFER_CAPACITY_FOR_ACID_ADDITIONS / _this.getGristWeight().getValue("kg");
        };
        /**
         * Estimates amount of calcium and magnesium from GH
         */
        this.estimateCalciumAndMagnesiumFromGh = function () {
            if (_this.gh == null) {
                return;
            }
            _this.setCalcium(new units_1.CalciumValue("mg/l", _this.gh.getValue("ppmCaCO3") * (1 - _this.assumedMgContributionToTestedGh / 100) / 17.8 * 7.14));
            _this.setMagnesium(new units_1.MagnesiumValue("mg/l", _this.gh.getValue("ppmCaCO3") * (_this.assumedMgContributionToTestedGh / 100) / 17.8 * 4.33));
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
    WaterCalculator.prototype.getMaltRoastedPercent = function () {
        return this.maltRoastedPercent;
    };
    /**
     * Sets malt roasted percent
     *
     * @returns malt roasted percent
     */
    WaterCalculator.prototype.setMaltRoastedPercent = function (maltRoastedPercent) {
        this.maltRoastedPercent = maltRoastedPercent;
    };
    /**
     * Returns water ion mass concentrations after added salts
     *
     * @param waterVolume volume of water the ions are beign observed
     * @returns water ion mass concentrations after added salts
     */
    WaterCalculator.prototype.getIonsAfterSalts = function (waterVolume) {
        var _a, _b, _c, _d, _e, _f;
        var result = this.getIonSaltChanges(waterVolume);
        result.calcium.add("mg/l", ((_a = this.getCalcium()) === null || _a === void 0 ? void 0 : _a.getValue("mg/l")) || 0);
        result.chloride.add("mg/l", ((_b = this.getChloride()) === null || _b === void 0 ? void 0 : _b.getValue("mg/l")) || 0);
        result.magnesium.add("mg/l", ((_c = this.getMagnesium()) === null || _c === void 0 ? void 0 : _c.getValue("mg/l")) || 0);
        result.sodium.add("mg/l", ((_d = this.getSodium()) === null || _d === void 0 ? void 0 : _d.getValue("mg/l")) || 0);
        result.sulfate.add("mg/l", ((_e = this.getSulfate()) === null || _e === void 0 ? void 0 : _e.getValue("mg/l")) || 0);
        result.bicarbonate.add("mg/l", ((_f = this.getBicarbonate()) === null || _f === void 0 ? void 0 : _f.getValue("mg/l")) || 0);
        return result;
    };
    /**
     * Returns water ion mass concentration changes caused by added salts
     *
     * @param waterVolume volume of water the changes are observed
     * @returns water ion mass concentration changes caused by added salts
     */
    WaterCalculator.prototype.getIonSaltChanges = function (waterVolume) {
        var result = {
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
    };
    /**
     * Returns ion balance.
     *
     * Ion balance gives the ion balance in %. Ideally it should be 0 (i.e. there are as many equivalents of cations as there are anions)
     * but if the water contains a substantial amount of ions that are not listed here (i.e. Potassium or Phosphates), the ions may not add up
     *
     * @returns ion balance
     */
    WaterCalculator.prototype.getIonBalance = function () {
        var _a, _b, _c, _d, _e;
        var calciumDh = ((_a = this.getCalcium()) === null || _a === void 0 ? void 0 : _a.getValue("dH")) || 0;
        var magnesiumDh = ((_b = this.getMagnesium()) === null || _b === void 0 ? void 0 : _b.getValue("dH")) || 0;
        var sodiumDh = ((_c = this.getSodium()) === null || _c === void 0 ? void 0 : _c.getValue("dH")) || 0;
        var sulfateDh = ((_d = this.getSulfate()) === null || _d === void 0 ? void 0 : _d.getValue("dH")) || 0;
        var chlorideDh = ((_e = this.getChloride()) === null || _e === void 0 ? void 0 : _e.getValue("dH")) || 0;
        var alkalinityDh = this.getAlkalinity().getValue("dH");
        var ionDhs = calciumDh + magnesiumDh + sodiumDh + sulfateDh + chlorideDh + alkalinityDh;
        if (ionDhs == 0) {
            return 0;
        }
        return (calciumDh + magnesiumDh + sodiumDh - sulfateDh - chlorideDh - alkalinityDh) / ionDhs * 50;
    };
    /**
     * Sets used water treatment method
     *
     * @param waterTreatment water treatment method
     */
    WaterCalculator.prototype.setWaterTreatment = function (waterTreatment) {
        this.waterTreatment = waterTreatment;
        if (this.waterTreatment) {
            this.waterTreatment.init(this);
        }
    };
    /**
     * Calculates required amount of lactic acid to lower pH by given amount.
     *
     * If pH delta is positive, returned amount will be 0
     *
     * @param phDelta required delta of pH
     * @returns required amount of lactic acid to lower pH by given amount.
     */
    WaterCalculator.prototype.getRequiredLacticAcidForPhChange = function (phDelta) {
        if (phDelta.getValue("pH") >= 0) {
            return new units_1.VolumeValue("ml", 0);
        }
        var lacticAcidStrength = 88;
        return new units_1.VolumeValue("μl", -phDelta.getValue("pH") * this.getGristWeight().getValue("kg") * consts_1.default.MASH_BUFFER_CAPACITY_FOR_ACID_ADDITIONS * consts_1.default.LACTIC_ACID_MOLAR_WEIGHT * 100 / lacticAcidStrength / consts_1.default.LACTIC_ACID_DENSITY_88);
    };
    /**
     * Calculates required amount of phosphoric acid to lower pH by given amount.
     *
     * If pH delta is positive, returned amount will be 0
     *
     * @param phDelta required delta of pH
     * @returns required amount of phosphoric acid to lower pH by given amount.
     */
    WaterCalculator.prototype.getRequiredPhosporicAcidForPhChange = function (phDelta) {
        if (phDelta.getValue("pH") >= 0) {
            return new units_1.VolumeValue("ml", 0);
        }
        var phosphoricAcidStrength = 10;
        return new units_1.VolumeValue("μl", phDelta.getValue("pH") * this.getGristWeight().getValue("kg") * consts_1.default.MASH_BUFFER_CAPACITY_FOR_ACID_ADDITIONS * consts_1.default.PHOSPHORIC_ACID_MOLECULAR_WEIGHT * 100 / -phosphoricAcidStrength / (phosphoricAcidStrength / 85 * (consts_1.default.PHOSPHORIC_ACID_DENSITY_85 - 1) + 1));
    };
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
    WaterCalculator.prototype.convertVolumeToStrength = function (value, fromStrength, toStrength) {
        if (!value || !fromStrength || !toStrength) {
            return value;
        }
        return new units_1.VolumeValue("ml", value.getValue("ml") / (toStrength / fromStrength));
    };
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
    WaterCalculator.prototype.convertMassToStrength = function (value, fromStrength, toStrength) {
        if (!value || !fromStrength || !toStrength) {
            return value;
        }
        return new units_1.MassValue("g", value.getValue("g") / (toStrength / fromStrength));
    };
    /**
     * Adds ion changes by given salt
     *
     * @param result resulting ions
     * @param waterVolume volume of water where changes take place
     * @param salt amount of salt
     * @param saltIons salt ion properties
     */
    WaterCalculator.prototype.addSaltIonChanges = function (result, waterVolume, salt, saltIons) {
        if (salt) {
            var saltConcentration = salt.getMassConcentration(waterVolume).getValue("mg/l");
            result.calcium.add("mg/l", saltConcentration * (saltIons.calcium || 0));
            result.chloride.add("mg/l", saltConcentration * (saltIons.chloride || 0));
            result.magnesium.add("mg/l", saltConcentration * (saltIons.magnesium || 0));
            result.sodium.add("mg/l", saltConcentration * (saltIons.sodium || 0));
            result.sulfate.add("mg/l", saltConcentration * (saltIons.sulfate || 0));
            result.bicarbonate.add("mg/l", saltConcentration * (saltIons.bicarbonate || 0));
        }
    };
    return WaterCalculator;
}());
exports.default = WaterCalculator;
//# sourceMappingURL=water-calculator.js.map