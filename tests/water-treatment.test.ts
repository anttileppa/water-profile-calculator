import WaterCalculator from "../src/index";
import { WaterHardnessValue, MassValue, ChlorideValue, MagnesiumValue, CalciumValue, SodiumValue, SulfateValue, BicarbonateValue, AlkalinityValue, VolumeValue, MassConcentrationValue, PhValue } from "../src/units";
import { BoilingWaterTreatment, LimeWaterTreatment } from "../src/water-treatment";

describe("Water Profile Calculator (water treatment)", () => {
  
  it("test water post boil pH", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setWaterVolume(new VolumeValue("l", 100));
    waterCalculator.setGristWeight(new MassValue("kg", 60));
    waterCalculator.setGypsum(new MassValue("g", 20));
    waterCalculator.setCalciumChloride(new MassValue("g", 20));
    waterCalculator.setCalcium(new CalciumValue("mg/l", 12));
    waterCalculator.setMagnesium(new MagnesiumValue("mg/l", 1.5));
    waterCalculator.setSodium(new SodiumValue("mg/l", 6.1));
    waterCalculator.setSulfate(new SulfateValue("mg/l", 5.0));
    waterCalculator.setChloride(new ChlorideValue("mg/l", 5.0));
    waterCalculator.setBicarbonate(new BicarbonateValue("mg/l", 300));
    waterCalculator.setWaterTreatment(new BoilingWaterTreatment(new WaterHardnessValue("dH", 0.5)));

    expect(waterCalculator.getWaterTreatmentPhChange().getValue("pH", 2)).toEqual(-0.01);
  });
  
  it("test water post lime treatment pH", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setWaterVolume(new VolumeValue("l", 100));
    waterCalculator.setGristWeight(new MassValue("kg", 60));
    waterCalculator.setGypsum(new MassValue("g", 20));
    waterCalculator.setCalciumChloride(new MassValue("g", 20));
    waterCalculator.setCalcium(new CalciumValue("mg/l", 12));
    waterCalculator.setMagnesium(new MagnesiumValue("mg/l", 1.5));
    waterCalculator.setSodium(new SodiumValue("mg/l", 6.1));
    waterCalculator.setSulfate(new SulfateValue("mg/l", 5.0));
    waterCalculator.setChloride(new ChlorideValue("mg/l", 5.0));
    waterCalculator.setBicarbonate(new BicarbonateValue("mg/l", 300));

    waterCalculator.setWaterTreatment(new LimeWaterTreatment());
    expect(waterCalculator.getWaterTreatmentPhChange().getValue("pH", 2)).toEqual(0.11);
    waterCalculator.setWaterTreatment(new LimeWaterTreatment(new WaterHardnessValue("dH", 3), new WaterHardnessValue("dH", 1.3)));
    expect(waterCalculator.getWaterTreatmentPhChange().getValue("pH", 2)).toEqual(0.01);
    waterCalculator.setWaterTreatment(new LimeWaterTreatment(new WaterHardnessValue("dH", 4)));
    expect(waterCalculator.getWaterTreatmentPhChange().getValue("pH", 2)).toEqual(0.15);
  });
  
  it("test water required amount of lime in lime treatment", () => {
    const waterCalculator = new WaterCalculator();
    const limeTreatment = new LimeWaterTreatment();

    waterCalculator.setWaterTreatment(limeTreatment);
    waterCalculator.setWaterVolume(new VolumeValue("l", 100));
    waterCalculator.setGristWeight(new MassValue("kg", 60));
    waterCalculator.setGypsum(new MassValue("g", 20));
    waterCalculator.setCalciumChloride(new MassValue("g", 20));
    waterCalculator.setCalcium(new CalciumValue("mg/l", 12));
    waterCalculator.setMagnesium(new MagnesiumValue("mg/l", 1.5));
    waterCalculator.setSodium(new SodiumValue("mg/l", 6.1));
    waterCalculator.setSulfate(new SulfateValue("mg/l", 5.0));
    waterCalculator.setChloride(new ChlorideValue("mg/l", 5.0));
    waterCalculator.setBicarbonate(new BicarbonateValue("mg/l", 300));
    
    expect(limeTreatment.getLimeConcentrationForLimeTreatment(new PhValue("pH", 8)).getValue("mg/l", 2)).toEqual(189.47);
    expect(limeTreatment.getLimeNeededForLimeTreatment(waterCalculator.getWaterVolume(), new PhValue("pH", 8)).getValue("g", 2)).toEqual(18.95);
  });

})
