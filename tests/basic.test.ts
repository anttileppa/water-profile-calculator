import WaterCalculator from "../src/index";
import { WaterHardnessValue } from "../src/units";

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

  it("test magnesium from GH", () => {
    const waterCalculator = new WaterCalculator();
    waterCalculator.setGH(new WaterHardnessValue("dH", 5));
    expect(waterCalculator.getMagnesium().getValue("mg/l")).toEqual(6.495);
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

})
