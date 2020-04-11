import WaterCalculator from "../src/index";
import { WaterHardnessValue, ChlorideValue, MagnesiumValue, CalciumValue, SodiumValue, SulfateValue, AlkalinityValue } from "../src/units";

describe("Water Profile Calculator (basic)", () => {

  it("test basic GH", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setGH(new WaterHardnessValue("dH", 5));
    expect(waterCalculator.getGH().getValue("dH")).toEqual(5);
    expect(waterCalculator.getGH().getValue("ppmCaCO3")).toEqual(89);

    waterCalculator.setGH(new WaterHardnessValue("ppmCaCO3", 35.6));
    expect(waterCalculator.getGH().getValue("dH")).toEqual(2);
    expect(waterCalculator.getGH().getValue("ppmCaCO3")).toEqual(35.6);

    waterCalculator.setGH(null);
    expect(waterCalculator.getGH()).toBeNull();
  });

  it("test basic KH", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setKH(new WaterHardnessValue("dH", 5));
    expect(waterCalculator.getKH().getValue("dH")).toEqual(5);
    expect(waterCalculator.getKH().getValue("ppmCaCO3")).toEqual(89);

    waterCalculator.setKH(new WaterHardnessValue("ppmCaCO3", 35.6));
    expect(waterCalculator.getKH().getValue("dH")).toEqual(2);
    expect(waterCalculator.getKH().getValue("ppmCaCO3")).toEqual(35.6);

    waterCalculator.setKH(null);
    expect(waterCalculator.getKH()).toBeNull();
  });

  it("test calcium from GH", () => {
    const waterCalculator = new WaterCalculator();
    waterCalculator.setGH(new WaterHardnessValue("dH", 5));
    expect(waterCalculator.getCalcium().getValue("mg/l")).toEqual(24.989999999999995);
  });

  it("test calcium", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getCalcium()).toBeNull();
    waterCalculator.setCalcium(new CalciumValue("mg/l", 22.5));
    expect(waterCalculator.getCalcium().getValue("mg/l")).toEqual(22.5);
    expect(waterCalculator.getCalcium().getValue("dH")).toEqual(3.151260504201681);
    waterCalculator.setCalcium(null);
    expect(waterCalculator.getCalcium()).toBeNull();
  });

  it("test magnesium from GH", () => {
    const waterCalculator = new WaterCalculator();
    waterCalculator.setGH(new WaterHardnessValue("dH", 5));
    expect(waterCalculator.getMagnesium().getValue("mg/l")).toEqual(6.495);
  });

  it("test magnesium", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getMagnesium()).toBeNull();
    waterCalculator.setMagnesium(new MagnesiumValue("mg/l", 5.8));
    expect(waterCalculator.getMagnesium().getValue("mg/l")).toEqual(5.8);
    expect(waterCalculator.getMagnesium().getValue("dH")).toEqual(1.3394919168591224);
    waterCalculator.setMagnesium(null);
    expect(waterCalculator.getMagnesium()).toBeNull();
  });

  it("test GH assumedMgContributionToTestedGh change", () => {
    const waterCalculator = new WaterCalculator();
    waterCalculator.setGH(new WaterHardnessValue("dH", 4.5));
    expect(waterCalculator.getCalcium().getValue("mg/l")).toEqual(22.49100000);
    expect(waterCalculator.getMagnesium().getValue("mg/l")).toEqual(5.84550000);
    waterCalculator.setAssumedMgContributionToTestedGh(25);
    expect(waterCalculator.getCalcium().getValue("mg/l")).toEqual(24.09750000);
    expect(waterCalculator.getMagnesium().getValue("mg/l")).toEqual(4.87125000);
  });
  
  it("test sodium", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getSodium()).toBeNull();
    waterCalculator.setSodium(new SodiumValue("mg/l", 60));
    expect(waterCalculator.getSodium().getValue("mg/l")).toEqual(60);
    expect(waterCalculator.getSodium().getValue("dH")).toEqual(7.326007326007327);
    waterCalculator.setSodium(null);
    expect(waterCalculator.getSodium()).toBeNull();
  });

  it("test sulfate", () => {
    const waterCalculator = new WaterCalculator();
    waterCalculator.setSulfate(new SulfateValue("mg/l", 44));
    expect(waterCalculator.getSulfate().getValue("mg/l")).toEqual(44);
    expect(waterCalculator.getSulfate().getValue("dH")).toEqual(2.573099415204678);
    waterCalculator.setSulfate(null);
    expect(waterCalculator.getSulfate()).toBeNull();
  });

  it("test chloride", () => {
    const waterCalculator = new WaterCalculator();
    waterCalculator.setChloride(new ChlorideValue("mg/l", 33));
    expect(waterCalculator.getChloride().getValue("mg/l")).toEqual(33);
    expect(waterCalculator.getChloride().getValue("dH")).toEqual(2.614896988906498);
    waterCalculator.setChloride(null);
    expect(waterCalculator.getChloride()).toBeNull();
  });

  // TODO: bicarb

  it("test alkalinity", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getAlkalinity()).toBeNull();
    waterCalculator.setAlkalinity(new AlkalinityValue("ppmCaCO3", 55));
    expect(waterCalculator.getAlkalinity().getValue("ppmCaCO3")).toEqual(55);
    expect(waterCalculator.getAlkalinity().getValue("dH")).toEqual(3.089887640449438);
    waterCalculator.setAlkalinity(null);
    expect(waterCalculator.getAlkalinity()).toBeNull();
  });

  it("test residual alkalinity", () => {
    const waterCalculator = new WaterCalculator();
    expect(waterCalculator.getResidualAlkalinity()).toBeNull();
    waterCalculator.setGH(new WaterHardnessValue("dH", 4.5));
    waterCalculator.setKH(new WaterHardnessValue("dH", 1));
    expect(waterCalculator.getResidualAlkalinity().getValue("dH")).toEqual(-0.09285714285714289);
    expect(waterCalculator.getResidualAlkalinity().getValue("ppmCaCO3")).toEqual(-1.6528571428571435);
  });

})
