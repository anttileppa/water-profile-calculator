import WaterCalculator from "../src/index";
import { ChlorideValue, MagnesiumValue, CalciumValue, SodiumValue, SulfateValue, BicarbonateValue, AlkalinityValue, VolumeValue } from "../src/units";
import { Salt } from "../src/salts";

describe("Water Profile Calculator (water treatment)", () => {
  
  it("test salt optimization", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setStrikeWater(new VolumeValue("gal", 5));
    waterCalculator.setSpargeWater(new VolumeValue("gal", 5));
    
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

    const targetResidualAlkalinity = new AlkalinityValue("mg/l", 0);
    const salts: Salt[] = ["gypsum", "epsom", "tableSalt", "calciumChloride", "magnesiumChloride", "bakingSoda"];
    const optimizedSalts = waterCalculator.optimizeSalts(targetProfile, targetResidualAlkalinity, salts);

    expect(optimizedSalts.strikeAdditions.gypsum.getValue("g/gal", 2)).toEqual(0.47);
    expect(optimizedSalts.strikeAdditions.epsom.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.tableSalt.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.bakingSoda.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.calciumChloride.getValue("g/gal", 2)).toEqual(0.27);
    expect(optimizedSalts.strikeAdditions.magnesiumChloride.getValue("g/gal", 2)).toEqual(0.12);
    expect(optimizedSalts.strikeAdditions.chalkDissolved.getValue("g/gal", 2)).toEqual(0);

    expect(optimizedSalts.spargeAdditions.gypsum.getValue("g/gal", 2)).toEqual(0.54);
    expect(optimizedSalts.spargeAdditions.epsom.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.tableSalt.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.bakingSoda.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.calciumChloride.getValue("g/gal", 2)).toEqual(0.35);
    expect(optimizedSalts.spargeAdditions.magnesiumChloride.getValue("g/gal", 2)).toEqual(0.14);
    expect(optimizedSalts.spargeAdditions.chalkDissolved.getValue("g/gal", 2)).toEqual(0);
  });

  it("test salt optimization target residual alkalinity", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setStrikeWater(new VolumeValue("gal", 5));
    waterCalculator.setSpargeWater(new VolumeValue("gal", 5));
    
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

    const targetResidualAlkalinity = new AlkalinityValue("mg/l", 40);
    const salts: Salt[] = ["gypsum", "epsom", "tableSalt", "calciumChloride", "magnesiumChloride", "bakingSoda"];
    
    const optimizedSalts = waterCalculator.optimizeSalts(targetProfile, targetResidualAlkalinity, salts);

    expect(optimizedSalts.strikeAdditions.gypsum.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.epsom.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.tableSalt.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.bakingSoda.getValue("g/gal", 2)).toEqual(0.02);
    expect(optimizedSalts.strikeAdditions.calciumChloride.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.magnesiumChloride.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.chalkDissolved.getValue("g/gal", 2)).toEqual(0);

    expect(optimizedSalts.spargeAdditions.gypsum.getValue("g/gal", 2)).toEqual(1.01);
    expect(optimizedSalts.spargeAdditions.epsom.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.tableSalt.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.bakingSoda.getValue("g/gal", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.calciumChloride.getValue("g/gal", 2)).toEqual(0.63);
    expect(optimizedSalts.spargeAdditions.magnesiumChloride.getValue("g/gal", 2)).toEqual(0.26);
    expect(optimizedSalts.spargeAdditions.chalkDissolved.getValue("g/gal", 2)).toEqual(0);

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
