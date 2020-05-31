import { MassValue, BicarbonateValue, VolumeValue, MassConcentrationValue, TimeValue } from "../src/units";

describe("Water Profile Calculator (units)", () => {

  it("test mass concentration in water", () => {
    const water = new VolumeValue("l", 100);
    const mass = new MassValue("kg", 25);

    expect(mass.getMassConcentration(water).getValue("kg/l", 2)).toEqual(0.25);
  });

  it("test mass in mass concentration", () => {
    const massConcentration = new MassConcentrationValue("kg/l", 0.25, NaN, NaN); 
    expect(massConcentration.getMass(new VolumeValue("l", 100)).getValue("kg", 2)).toEqual(25);
  });

  it("test mass concentration in mass", () => {
    const mass1 = new MassValue("g", 25);
    const mass2 = new MassValue("kg", 1);

    expect(mass1.getMassFraction(mass2).getValue("mg/kg", 2)).toEqual(25000);
  });

  it("test bicarbonate mEq/l", () => {
    expect(new BicarbonateValue("mg/l", 52).getValue("mEq/l", 2)).toEqual(0.85);
  });

  it("test time", () => {
    const day = new TimeValue("d", 1);
    const hour = new TimeValue("min", 60);
    expect(hour.getValue("s")).toBe(3600);
    expect(hour.getValue("min")).toBe(60);
    expect(hour.getValue("h")).toBe(1);

    expect(day.getValue("h")).toBe(24);
    expect(day.getValue("min")).toBe(1440);
    expect(day.getValue("d")).toBe(1);
  });

  it("test g/gal to mg/l", () => {
    const mgl = new MassConcentrationValue("g/gal", 0.94, NaN, NaN); 
    expect(mgl.getValue("mg/l", 2)).toEqual(248.32);
  });

  it("test mg/l to g/gal", () => {
    const mgl = new MassConcentrationValue("mg/l", 528.344, NaN, NaN); 
    expect(mgl.getValue("g/gal", 2)).toEqual(2);
    const ggal = new MassConcentrationValue("g/gal", 1056.69, NaN, NaN); 
    expect(ggal.getValue("mg/l", 2)).toEqual(279147.97);
    expect(new MassConcentrationValue("mg/l", 266.8138, NaN, NaN).getValue("g/gal", 2)).toEqual(1.01);
  });

  it("test mg/l to g/l", () => {
    const mgl = new MassConcentrationValue("mg/l", 400, NaN, NaN); 
    expect(mgl.getValue("g/l", 2)).toEqual(0.4);    
    const gl = new MassConcentrationValue("g/l", 5, NaN, NaN); 
    expect(gl.getValue("g/l", 2)).toEqual(5);    
  });

})
