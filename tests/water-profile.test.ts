import WaterCalculator, { ionList } from "../src/index";
import { ChlorideValue, MagnesiumValue, CalciumValue, SodiumValue, SulfateValue, BicarbonateValue, AlkalinityValue, VolumeValue } from "../src/units";
import { Salt } from "../src/salts";

describe("Water Profile Calculator (water treatment)", () => {
  
  it("test salt optimization - single", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setWaterVolume(new VolumeValue("l", 50));    
    waterCalculator.setInitialWaterProfile({
      calcium: new CalciumValue("mg/l", 4.0),
      magnesium: new MagnesiumValue("mg/l", 0.9),
      sodium: new SodiumValue("mg/l", 32.6),
      sulfate: new SulfateValue("mg/l", 5.5),
      chloride: new ChlorideValue("mg/l", 23.2),
      bicarbonate: new BicarbonateValue("mg/l", 49.2)
    });

    const targetProfile = {
      calcium: new CalciumValue("mg/l", 80),
      magnesium: new MagnesiumValue("mg/l", 5),
      sodium: new SodiumValue("mg/l", 25),
      sulfate: new SulfateValue("mg/l", 80),
      chloride: new ChlorideValue("mg/l", 75),
      bicarbonate: new BicarbonateValue("mg/l", 100)
    };

    expect(waterCalculator.getWaterProfileTotalError(targetProfile)).toEqual(264.8)

    const salts: Salt[] = ["gypsum"];
    const optimizedSalts = waterCalculator.optimizeSalts(targetProfile, salts);
    waterCalculator.setSaltConcentrations(optimizedSalts);
    
    expect(waterCalculator.getWaterProfileTotalError(targetProfile)).toBeLessThan(186);
    expect(optimizedSalts.gypsum.getValue("mg/l", 2)).toEqual(214.81);
    expect(optimizedSalts.epsom.getValue("mg/l", 2)).toEqual(0);
    expect(optimizedSalts.tableSalt.getValue("mg/l", 2)).toEqual(0);
    expect(optimizedSalts.bakingSoda.getValue("mg/l", 2)).toEqual(0);
    expect(optimizedSalts.calciumChloride.getValue("mg/l", 2)).toEqual(0);
    expect(optimizedSalts.magnesiumChloride.getValue("mg/l", 2)).toEqual(0);
    expect(optimizedSalts.chalkDissolved.getValue("mg/l", 2)).toEqual(0);
  });
  
  it("test salt optimization - all", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setWaterVolume(new VolumeValue("l", 50));    
    waterCalculator.setInitialWaterProfile({
      calcium: new CalciumValue("mg/l", 4.0),
      magnesium: new MagnesiumValue("mg/l", 0.9),
      sodium: new SodiumValue("mg/l", 32.6),
      sulfate: new SulfateValue("mg/l", 5.5),
      chloride: new ChlorideValue("mg/l", 23.2),
      bicarbonate: new BicarbonateValue("mg/l", 49.2)
    });

    const targetProfile = {
      calcium: new CalciumValue("mg/l", 80),
      magnesium: new MagnesiumValue("mg/l", 5),
      sodium: new SodiumValue("mg/l", 25),
      sulfate: new SulfateValue("mg/l", 80),
      chloride: new ChlorideValue("mg/l", 75),
      bicarbonate: new BicarbonateValue("mg/l", 100)
    };

    expect(waterCalculator.getWaterProfileTotalError(targetProfile)).toEqual(264.8)

    const salts: Salt[] = ["gypsum" , "epsom" , "tableSalt" , "bakingSoda", "calciumChloride", "magnesiumChloride", "chalkDissolved"];
    const optimizedSalts = waterCalculator.optimizeSalts(targetProfile, salts);
    waterCalculator.setSaltConcentrations(optimizedSalts);
    
    expect(waterCalculator.getWaterProfileTotalError(targetProfile)).toBeLessThan(115)
    expect(optimizedSalts.gypsum.getValue("mg/l", 2)).toEqual(89.62);
    expect(optimizedSalts.epsom.getValue("mg/l", 2)).toEqual(0);
    expect(optimizedSalts.tableSalt.getValue("mg/l", 2)).toEqual(0);
    expect(optimizedSalts.bakingSoda.getValue("mg/l", 2)).toEqual(0);
    expect(optimizedSalts.calciumChloride.getValue("mg/l", 2)).toEqual(106.89);
    expect(optimizedSalts.magnesiumChloride.getValue("mg/l", 2)).toEqual(0);
    expect(optimizedSalts.chalkDissolved.getValue("mg/l", 2)).toEqual(0);
  });
  
  it("test water profile difference - zero difference", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setInitialWaterProfile({
      calcium: new CalciumValue("mg/l", 10),
      magnesium: new MagnesiumValue("mg/l", 20),
      sodium: new SodiumValue("mg/l", 30),
      sulfate: new SulfateValue("mg/l", 40),
      chloride: new ChlorideValue("mg/l", 50),
      bicarbonate: new BicarbonateValue("mg/l", 60)
    });

    const targetProfile = {
      calcium: new CalciumValue("mg/l", 10),
      magnesium: new MagnesiumValue("mg/l", 20),
      sodium: new SodiumValue("mg/l", 30),
      sulfate: new SulfateValue("mg/l", 40),
      chloride: new ChlorideValue("mg/l", 50),
      bicarbonate: new BicarbonateValue("mg/l", 60)
    };

    const profileDifference = waterCalculator.getWaterProfileDifference(waterCalculator.getInitialWaterProfile(), targetProfile);
    expect(profileDifference.calcium.getValue("mg/l", 2)).toEqual(0);
    expect(profileDifference.magnesium.getValue("mg/l", 2)).toEqual(0);
    expect(profileDifference.sodium.getValue("mg/l", 2)).toEqual(0);
    expect(profileDifference.sulfate.getValue("mg/l", 2)).toEqual(0);
    expect(profileDifference.chloride.getValue("mg/l", 2)).toEqual(0);
    expect(profileDifference.bicarbonate.getValue("mg/l", 2)).toEqual(0);
  });

  it("test water profile difference - negative difference", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setInitialWaterProfile({
      calcium: new CalciumValue("mg/l", 10),
      magnesium: new MagnesiumValue("mg/l", 20),
      sodium: new SodiumValue("mg/l", 30),
      sulfate: new SulfateValue("mg/l", 40),
      chloride: new ChlorideValue("mg/l", 50),
      bicarbonate: new BicarbonateValue("mg/l", 60)
    });

    const targetProfile = {
      calcium: new CalciumValue("mg/l", 5),
      magnesium: new MagnesiumValue("mg/l", 10),
      sodium: new SodiumValue("mg/l", 15),
      sulfate: new SulfateValue("mg/l", 20),
      chloride: new ChlorideValue("mg/l", 25),
      bicarbonate: new BicarbonateValue("mg/l", 30)
    };

    const profileDifference = waterCalculator.getWaterProfileDifference(waterCalculator.getInitialWaterProfile(), targetProfile);
    expect(profileDifference.calcium.getValue("mg/l", 2)).toEqual(-5);
    expect(profileDifference.magnesium.getValue("mg/l", 2)).toEqual(-10);
    expect(profileDifference.sodium.getValue("mg/l", 2)).toEqual(-15);
    expect(profileDifference.sulfate.getValue("mg/l", 2)).toEqual(-20);
    expect(profileDifference.chloride.getValue("mg/l", 2)).toEqual(-25);
    expect(profileDifference.bicarbonate.getValue("mg/l", 2)).toEqual(-30);    
  });

  it("test water profile difference - positive difference", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setInitialWaterProfile({
      calcium: new CalciumValue("mg/l", 10),
      magnesium: new MagnesiumValue("mg/l", 20),
      sodium: new SodiumValue("mg/l", 30),
      sulfate: new SulfateValue("mg/l", 40),
      chloride: new ChlorideValue("mg/l", 50),
      bicarbonate: new BicarbonateValue("mg/l", 60)
    });

    const targetProfile = {
      calcium: new CalciumValue("mg/l", 15),
      magnesium: new MagnesiumValue("mg/l", 30),
      sodium: new SodiumValue("mg/l", 45),
      sulfate: new SulfateValue("mg/l", 60),
      chloride: new ChlorideValue("mg/l", 75),
      bicarbonate: new BicarbonateValue("mg/l", 90)
    };

    const profileDifference = waterCalculator.getWaterProfileDifference(waterCalculator.getInitialWaterProfile(), targetProfile);
    expect(profileDifference.calcium.getValue("mg/l", 2)).toEqual(5);
    expect(profileDifference.magnesium.getValue("mg/l", 2)).toEqual(10);
    expect(profileDifference.sodium.getValue("mg/l", 2)).toEqual(15);
    expect(profileDifference.sulfate.getValue("mg/l", 2)).toEqual(20);
    expect(profileDifference.chloride.getValue("mg/l", 2)).toEqual(25);
    expect(profileDifference.bicarbonate.getValue("mg/l", 2)).toEqual(30);    
  });
  
})
