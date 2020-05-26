import WaterCalculator from "../src/index";
import { WaterHardnessValue, MassValue, ChlorideValue, MagnesiumValue, CalciumValue, SodiumValue, SulfateValue, BicarbonateValue, AlkalinityValue, VolumeValue, MassConcentrationValue, PhValue } from "../src/units";
import { BoilingWaterTreatment, LimeWaterTreatment } from "../src/water-treatment";

describe("Water Profile Calculator (water treatment)", () => {
  
  it("test salt optimization", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setStrikeWater(new VolumeValue("gal", 5));
    waterCalculator.setSpargeWater(new VolumeValue("gal", 5));
    
    waterCalculator.setWaterProfile({
      calcium: new CalciumValue("mg/l", 4.0),
      magnesium: new MagnesiumValue("mg/l", 0.9),
      sodium: new SodiumValue("mg/l", 32.6),
      sulfate: new SulfateValue("mg/l", 5.5),
      chloride: new ChlorideValue("mg/l", 23.2),
      bicarbonate: new BicarbonateValue("mg/l", 49.2)
    });

    const optimizedSalts = waterCalculator.optimizeSalts({
      calcium: new CalciumValue("mg/l", 80),
      magnesium: new MagnesiumValue("mg/l", 5),
      sodium: new SodiumValue("mg/l", 25),
      sulfate: new SulfateValue("mg/l", 80),
      chloride: new ChlorideValue("mg/l", 75),
      bicarbonate: new BicarbonateValue("mg/l", 100)
    }, { 
      salts: {
        gypsum: true,
        epsom: true,
        tableSalt: true,
        calciumChloride: true,
        magnesiumChloride: true,
        bakingSoda: true,
        chalkDissolved: false
      }
    });

    expect(optimizedSalts.strikeAdditions.gypsum.getValue("g", 2)).toEqual(0.46);
    expect(optimizedSalts.strikeAdditions.epsom.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.tableSalt.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.bakingSoda.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.calciumChloride.getValue("g", 2)).toEqual(0.33);
    expect(optimizedSalts.strikeAdditions.magnesiumChloride.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.chalkDissolved.getValue("g", 2)).toEqual(0);

    expect(optimizedSalts.spargeAdditions.gypsum.getValue("g", 2)).toEqual(0.56);
    expect(optimizedSalts.spargeAdditions.epsom.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.tableSalt.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.bakingSoda.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.calciumChloride.getValue("g", 2)).toEqual(0.3);
    expect(optimizedSalts.spargeAdditions.magnesiumChloride.getValue("g", 2)).toEqual(0.26);
    expect(optimizedSalts.spargeAdditions.chalkDissolved.getValue("g", 2)).toEqual(0);

  });

  it("test salt optimization with dissolved chalk", () => {
    const waterCalculator = new WaterCalculator();

    waterCalculator.setStrikeWater(new VolumeValue("gal", 5));
    waterCalculator.setSpargeWater(new VolumeValue("gal", 5));
    
    waterCalculator.setWaterProfile({
      calcium: new CalciumValue("mg/l", 4.0),
      magnesium: new MagnesiumValue("mg/l", 0.9),
      sodium: new SodiumValue("mg/l", 32.6),
      sulfate: new SulfateValue("mg/l", 5.5),
      chloride: new ChlorideValue("mg/l", 23.2),
      bicarbonate: new BicarbonateValue("mg/l", 49.2)
    });

    const optimizedSalts = waterCalculator.optimizeSalts({
      calcium: new CalciumValue("mg/l", 80),
      magnesium: new MagnesiumValue("mg/l", 5),
      sodium: new SodiumValue("mg/l", 25),
      sulfate: new SulfateValue("mg/l", 80),
      chloride: new ChlorideValue("mg/l", 75),
      bicarbonate: new BicarbonateValue("mg/l", 100)
    }, { 
      salts: {
        gypsum: true,
        epsom: true,
        tableSalt: true,
        calciumChloride: true,
        magnesiumChloride: true,
        bakingSoda: true,
        chalkDissolved: true
      }
    });

    expect(optimizedSalts.strikeAdditions.gypsum.getValue("g", 2)).toEqual(1.01);
    expect(optimizedSalts.strikeAdditions.epsom.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.tableSalt.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.bakingSoda.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.strikeAdditions.calciumChloride.getValue("g", 2)).toEqual(0.63);
    expect(optimizedSalts.strikeAdditions.magnesiumChloride.getValue("g", 2)).toEqual(0.26);
    expect(optimizedSalts.strikeAdditions.chalkDissolved.getValue("g", 2)).toEqual(0.24);
    
    expect(optimizedSalts.spargeAdditions.gypsum.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.epsom.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.tableSalt.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.bakingSoda.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.calciumChloride.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.magnesiumChloride.getValue("g", 2)).toEqual(0);
    expect(optimizedSalts.spargeAdditions.chalkDissolved.getValue("g", 2)).toEqual(0);
  });
  
})
