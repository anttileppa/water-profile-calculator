import WaterCalculator from "../src/index";
import { BeerColorValue, WaterHardnessValue, MassValue, ChlorideValue, MagnesiumValue, CalciumValue, SodiumValue, SulfateValue, BicarbonateValue, AlkalinityValue, VolumeValue, MassConcentrationValue, PhValue } from "../src/units";
import { BoilingWaterTreatment, LimeWaterTreatment } from "../src/water-treatment";

describe("Water Profile Calculator (pH tests)", () => {

  it("test distilled water mash pH estimation", () => {
    const waterCalculator = new WaterCalculator();
    waterCalculator.setBeerColor(new BeerColorValue("SRM", 44));
    waterCalculator.setMaltRoastedPercent(70);
    expect(waterCalculator.estimateDistilledWaterMashPh().getValue("pH", 2)).toEqual(5.22);
  });

  it("test acid pH change", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setGristWeight(new MassValue("kg", 60));
    waterCalculator.setStrikeWater(new VolumeValue("l", 100));
    waterCalculator.setLacticAcid(new VolumeValue("ml", 100));
    waterCalculator.setPhosphoricAcid(new VolumeValue("ml", 50), 10);
    waterCalculator.setAcidMalt(new MassValue("g", 200));

    expect(waterCalculator.getMashPhChangeFromAcidAdditions().getValue("pH", 2)).toEqual(-0.43);
    waterCalculator.setPhosphoricAcid(null);
    expect(waterCalculator.getMashPhChangeFromAcidAdditions().getValue("pH", 2)).toEqual(-0.41);
    waterCalculator.setLacticAcid(null);
    expect(waterCalculator.getMashPhChangeFromAcidAdditions().getValue("pH", 2)).toEqual(-0.02);
    waterCalculator.setAcidMalt(null);
    expect(waterCalculator.getMashPhChangeFromAcidAdditions().getValue("pH", 2)).toEqual(-0);
  });

  it("test water ph change", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setStrikeWater(new VolumeValue("l", 100));
    waterCalculator.setGristWeight(new MassValue("kg", 60));
    waterCalculator.setBeerColor(new BeerColorValue("SRM", 11));
    waterCalculator.setMaltRoastedPercent(70);
    waterCalculator.setGH(new WaterHardnessValue("dH", 4.5));
    waterCalculator.setKH(new WaterHardnessValue("dH", 1.0));

    expect(waterCalculator.estimateDistilledWaterMashPh().getValue("pH", 2)).toEqual(5.5);
    expect(waterCalculator.getOverallPhChange().getValue("pH", 2)).toEqual(-0);

    waterCalculator.setGypsum(new MassValue("g", 20));
    waterCalculator.setCalciumChloride(new MassValue("g", 20));
    expect(waterCalculator.getOverallPhChange().getValue("pH", 2)).toEqual(-0.05);

    waterCalculator.setWaterTreatment(new BoilingWaterTreatment());
    expect(waterCalculator.getOverallPhChange().getValue("pH", 2)).toEqual(-0.05);

    waterCalculator.setWaterTreatment(new BoilingWaterTreatment(new WaterHardnessValue("dH", 2)));
    expect(waterCalculator.getOverallPhChange().getValue("pH", 2)).toEqual(-0.06);

    waterCalculator.setLacticAcid(new VolumeValue("ml", 40));
    expect(waterCalculator.getOverallPhChange().getValue("pH", 2)).toEqual(-0.21);

    waterCalculator.setPhosphoricAcid(new VolumeValue("ml", 20));
    expect(waterCalculator.getOverallPhChange().getValue("pH", 2)).toEqual(-0.22);
  });

})
