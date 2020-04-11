import WaterCalculator from "../src/index";
import { WaterHardnessValue, ChlorideValue, MagnesiumValue, CalciumValue, SodiumValue, SulfateValue, AlkalinityValue, VolumeValue } from "../src/units";

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

  // TODO: bicarb

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
})
