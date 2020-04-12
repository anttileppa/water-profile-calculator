import WaterCalculator from "../src/index";
import { BeerColorValue, WaterHardnessValue, MassValue, ChlorideValue, MagnesiumValue, CalciumValue, SodiumValue, SulfateValue, AlkalinityValue, VolumeValue } from "../src/units";

describe("Water Profile Calculator (basic)", () => {

  it("test basic GH", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setGH(new WaterHardnessValue("dH", 5));
    expect(waterCalculator.getGH().getValue("dH", 2)).toEqual(5);
    expect(waterCalculator.getGH().getValue("ppmCaCO3", 2)).toEqual(88.97);

    waterCalculator.setGH(new WaterHardnessValue("ppmCaCO3", 35.6));
    expect(waterCalculator.getGH().getValue("dH", 2)).toEqual(2);
    expect(waterCalculator.getGH().getValue("ppmCaCO3", 2)).toEqual(35.6);

    waterCalculator.setGH(null);
    expect(waterCalculator.getGH()).toBeNull();
  });

  it("test basic KH", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setKH(new WaterHardnessValue("dH", 5));
    expect(waterCalculator.getKH().getValue("dH", 2)).toEqual(5);
    expect(waterCalculator.getKH().getValue("ppmCaCO3", 2)).toEqual(88.97);

    waterCalculator.setKH(new WaterHardnessValue("ppmCaCO3", 35.6));
    expect(waterCalculator.getKH().getValue("dH", 2)).toEqual(2);
    expect(waterCalculator.getKH().getValue("ppmCaCO3", 2)).toEqual(35.6);

    waterCalculator.setKH(null);
    expect(waterCalculator.getKH()).toBeNull();
  });

  it("test calcium from GH", () => {
    const waterCalculator = new WaterCalculator();
    waterCalculator.setGH(new WaterHardnessValue("dH", 5));
    expect(waterCalculator.getCalcium().getValue("mg/l", 2)).toEqual(24.98);
  });

  it("test calcium", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getCalcium()).toBeNull();
    waterCalculator.setCalcium(new CalciumValue("mg/l", 22.5));
    expect(waterCalculator.getCalcium().getValue("mg/l", 2)).toEqual(22.5);
    expect(waterCalculator.getCalcium().getValue("dH", 2)).toEqual(3.15);
    waterCalculator.setCalcium(null);
    expect(waterCalculator.getCalcium()).toBeNull();
  });

  it("test magnesium from GH", () => {
    const waterCalculator = new WaterCalculator();
    waterCalculator.setGH(new WaterHardnessValue("dH", 5));
    expect(waterCalculator.getMagnesium().getValue("mg/l", 2)).toEqual(6.49);
  });

  it("test magnesium", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getMagnesium()).toBeNull();
    waterCalculator.setMagnesium(new MagnesiumValue("mg/l", 5.8));
    expect(waterCalculator.getMagnesium().getValue("mg/l", 2)).toEqual(5.8);
    expect(waterCalculator.getMagnesium().getValue("dH", 2)).toEqual(1.34);
    waterCalculator.setMagnesium(null);
    expect(waterCalculator.getMagnesium()).toBeNull();
  });

  it("test GH assumedMgContributionToTestedGh change", () => {
    const waterCalculator = new WaterCalculator();
    waterCalculator.setGH(new WaterHardnessValue("dH", 4.5));
    expect(waterCalculator.getCalcium().getValue("mg/l", 2)).toEqual(22.48);
    expect(waterCalculator.getMagnesium().getValue("mg/l", 2)).toEqual(5.84);
    waterCalculator.setAssumedMgContributionToTestedGh(25);
    expect(waterCalculator.getCalcium().getValue("mg/l", 2)).toEqual(24.09);
    expect(waterCalculator.getMagnesium().getValue("mg/l", 2)).toEqual(4.87);
  });
  
  it("test sodium", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getSodium()).toBeNull();
    waterCalculator.setSodium(new SodiumValue("mg/l", 60));
    expect(waterCalculator.getSodium().getValue("mg/l", 2)).toEqual(60);
    expect(waterCalculator.getSodium().getValue("dH", 2)).toEqual(7.33);
    waterCalculator.setSodium(null);
    expect(waterCalculator.getSodium()).toBeNull();
  });

  it("test sulfate", () => {
    const waterCalculator = new WaterCalculator();
    waterCalculator.setSulfate(new SulfateValue("mg/l", 44));
    expect(waterCalculator.getSulfate().getValue("mg/l", 2)).toEqual(44);
    expect(waterCalculator.getSulfate().getValue("dH", 2)).toEqual(2.57);
    waterCalculator.setSulfate(null);
    expect(waterCalculator.getSulfate()).toBeNull();
  });

  it("test chloride", () => {
    const waterCalculator = new WaterCalculator();
    waterCalculator.setChloride(new ChlorideValue("mg/l", 33));
    expect(waterCalculator.getChloride().getValue("mg/l", 2)).toEqual(33);
    expect(waterCalculator.getChloride().getValue("dH", 2)).toEqual(2.61);
    waterCalculator.setChloride(null);
    expect(waterCalculator.getChloride()).toBeNull();
  });

  // TODO: bicarb00

  it("test alkalinity", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getAlkalinity()).toBeNull();
    waterCalculator.setAlkalinity(new AlkalinityValue("ppmCaCO3", 55));
    expect(waterCalculator.getAlkalinity().getValue("ppmCaCO3", 2)).toEqual(55);
    expect(waterCalculator.getAlkalinity().getValue("dH", 2)).toEqual(3.09);
    waterCalculator.setAlkalinity(null);
    expect(waterCalculator.getAlkalinity()).toBeNull();
  });

  it("test residual alkalinity", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getResidualAlkalinity()).toBeNull();
    waterCalculator.setGH(new WaterHardnessValue("dH", 4.5));
    waterCalculator.setKH(new WaterHardnessValue("dH", 1));
    expect(waterCalculator.getResidualAlkalinity().getValue("dH", 2)).toEqual(-0.09);
    expect(waterCalculator.getResidualAlkalinity().getValue("ppmCaCO3", 2)).toEqual(-1.65);
  });

  it("test water volumes", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getStrikeWater().getValue("l", 2)).toEqual(0);
    expect(waterCalculator.getSpargeWater().getValue("l", 2)).toEqual(0);
    expect(waterCalculator.getTotalWater().getValue("l", 2)).toEqual(0);

    waterCalculator.setStrikeWater(new VolumeValue("l", 10));

    expect(waterCalculator.getStrikeWater().getValue("l", 2)).toEqual(10);
    expect(waterCalculator.getStrikeWater().getValue("qt", 2)).toEqual(10.57);
    expect(waterCalculator.getStrikeWater().getValue("gal", 2)).toEqual(2.64);
    expect(waterCalculator.getSpargeWater().getValue("l", 2)).toEqual(0);
    expect(waterCalculator.getTotalWater().getValue("l", 2)).toEqual(10);

    waterCalculator.setSpargeWater(new VolumeValue("l", 5));

    expect(waterCalculator.getSpargeWater().getValue("l", 2)).toEqual(5);
    expect(waterCalculator.getSpargeWater().getValue("qt", 2)).toEqual(5.28);
    expect(waterCalculator.getSpargeWater().getValue("gal", 2)).toEqual(1.32);
    expect(waterCalculator.getTotalWater().getValue("l", 2)).toEqual(15);
  });

  it("test grist weight", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getGristWeight().getValue("kg", 2)).toEqual(0);
    waterCalculator.setGristWeight(new MassValue("kg", 10));
    expect(waterCalculator.getGristWeight().getValue("kg", 2)).toEqual(10);
    expect(waterCalculator.getGristWeight().getValue("lb", 2)).toEqual(22.05);
  });

  it("test mash thickness", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getMashThickness().getValue("l/kg", 2)).toEqual(0);

    waterCalculator.setStrikeWater(new VolumeValue("l", 200));
    waterCalculator.setGristWeight(new MassValue("kg", 60));

    expect(waterCalculator.getMashThickness().getValue("l/kg", 2)).toEqual(3.33);
    expect(waterCalculator.getMashThickness().getValue("qt/lb", 2)).toEqual(1.60);
  });

  it("test beer color", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getBeerColor()).toBeNull();
    waterCalculator.setBeerColor(new BeerColorValue("SRM", 14));
    expect(waterCalculator.getBeerColor().getValue("SRM", 2)).toEqual(14);
    expect(waterCalculator.getBeerColor().getValue("EBC", 2)).toEqual(27.58);
  });

  it("test gypsum", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getGypsum()).toBeNull();
    waterCalculator.setGypsum(new MassValue("g", 10));
    expect(waterCalculator.getGypsum().getValue("g", 2)).toEqual(10);
    expect(waterCalculator.getGypsum().getMassConcentrationInWater(new VolumeValue("l", 300)).getValue("mg/l", 2)).toEqual(33.33);
    waterCalculator.setGypsum(null);
    expect(waterCalculator.getGypsum()).toBeNull();
  }); 
  
  it("test epsom", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getEpsom()).toBeNull();
    waterCalculator.setEpsom(new MassValue("g", 20));
    expect(waterCalculator.getEpsom().getValue("g", 2)).toEqual(20);
    expect(waterCalculator.getEpsom().getMassConcentrationInWater(new VolumeValue("l", 300)).getValue("mg/l", 2)).toEqual(66.67);
    waterCalculator.setEpsom(null);
    expect(waterCalculator.getEpsom()).toBeNull();
  });

  it("test table salt", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getTableSalt()).toBeNull();
    waterCalculator.setTableSalt(new MassValue("g", 30));
    expect(waterCalculator.getTableSalt().getValue("g", 2)).toEqual(30);
    expect(waterCalculator.getTableSalt().getMassConcentrationInWater(new VolumeValue("l", 300)).getValue("mg/l", 2)).toEqual(100);
    waterCalculator.setTableSalt(null);
    expect(waterCalculator.getTableSalt()).toBeNull();
  });

  it("test calcium chloride", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getCalciumChloride()).toBeNull();
    waterCalculator.setCalciumChloride(new MassValue("g", 40));
    expect(waterCalculator.getCalciumChloride().getValue("g", 2)).toEqual(40);
    expect(waterCalculator.getCalciumChloride().getMassConcentrationInWater(new VolumeValue("l", 300)).getValue("mg/l", 2)).toEqual(133.33);
    waterCalculator.setCalciumChloride(null);
    expect(waterCalculator.getCalciumChloride()).toBeNull();
  });

  it("test magnesium chloride", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getMagnesiumChloride()).toBeNull();
    waterCalculator.setMagnesiumChloride(new MassValue("g", 50));
    expect(waterCalculator.getMagnesiumChloride().getValue("g", 2)).toEqual(50);
    expect(waterCalculator.getMagnesiumChloride().getMassConcentrationInWater(new VolumeValue("l", 300)).getValue("mg/l", 2)).toEqual(166.67);
    waterCalculator.setMagnesiumChloride(null);
    expect(waterCalculator.getMagnesiumChloride()).toBeNull();
  });

  it("test baking soda", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getBakingSoda()).toBeNull();
    waterCalculator.setBakingSoda(new MassValue("g", 60));
    expect(waterCalculator.getBakingSoda().getValue("g", 2)).toEqual(60);
    expect(waterCalculator.getBakingSoda().getMassConcentrationInWater(new VolumeValue("l", 300)).getValue("mg/l", 2)).toEqual(200);
    waterCalculator.setBakingSoda(null);
    expect(waterCalculator.getBakingSoda()).toBeNull();
  }); 

  it("test chalk", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getChalk()).toBeNull();
    waterCalculator.setChalk(new MassValue("g", 70));
    expect(waterCalculator.getChalk().getValue("g", 2)).toEqual(70);
    expect(waterCalculator.getChalk().getMassConcentrationInWater(new VolumeValue("l", 300)).getValue("mg/l", 2)).toEqual(233.33);
    waterCalculator.setChalk(null);
    expect(waterCalculator.getChalk()).toBeNull();
  });

  it("test lactic acid", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getLacticAcid()).toBeNull();
    waterCalculator.setLacticAcid(new VolumeValue("ml", 100));
    
    expect(waterCalculator.getLacticAcid().getValue("ml")).toEqual(100);
    expect(waterCalculator.getLacticAcid(88).getValue("ml")).toEqual(100);
    expect(waterCalculator.getLacticAcid(44).getValue("ml")).toEqual(200);

    waterCalculator.setLacticAcid(new VolumeValue("ml", 100), 44);

    expect(waterCalculator.getLacticAcid().getValue("ml")).toEqual(50);
    expect(waterCalculator.getLacticAcid(88).getValue("ml")).toEqual(50);
    expect(waterCalculator.getLacticAcid(44).getValue("ml")).toEqual(100);
  });

  it("test phosphoric acid", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getPhosphoricAcid()).toBeNull();
    waterCalculator.setPhosphoricAcid(new VolumeValue("ml", 100));
    
    expect(waterCalculator.getPhosphoricAcid().getValue("ml")).toEqual(100);
    expect(waterCalculator.getPhosphoricAcid(10).getValue("ml")).toEqual(100);
    expect(waterCalculator.getPhosphoricAcid(5).getValue("ml")).toEqual(200);

    waterCalculator.setPhosphoricAcid(new VolumeValue("ml", 100), 5);

    expect(waterCalculator.getPhosphoricAcid().getValue("ml")).toEqual(50);
    expect(waterCalculator.getPhosphoricAcid(10).getValue("ml")).toEqual(50);
    expect(waterCalculator.getPhosphoricAcid(5).getValue("ml")).toEqual(100);
  });

  it("test acid malt", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getAcidMalt()).toBeNull();
    waterCalculator.setAcidMalt(new MassValue("g", 100));
    
    expect(waterCalculator.getAcidMalt().getValue("g")).toEqual(100);
    expect(waterCalculator.getAcidMalt(3).getValue("g")).toEqual(100);
    expect(waterCalculator.getAcidMalt(1.5).getValue("g")).toEqual(200);

    waterCalculator.setAcidMalt(new MassValue("g", 100), 1.5);

    expect(waterCalculator.getAcidMalt().getValue("g")).toEqual(50);
    expect(waterCalculator.getAcidMalt(3).getValue("g")).toEqual(50);
    expect(waterCalculator.getAcidMalt(1.5).getValue("g")).toEqual(100);
  });
})
