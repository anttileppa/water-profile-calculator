import { WaterProfile } from "./water-profile";
import { MassConcentrationValue } from "./units";
import { saltIonMap, ionList } from "./ions";
import { Salt, SaltConcentrations } from "./salts";
import WaterCalculator from "./water-calculator";
import LPSolver, { IMultiObjectiveModel, IModelVariableConstraint } from "javascript-lp-solver";

/**
 * LPSolver result vertice
 */
interface ResultVertice {
  bounded: boolean,
  gypsum?: number;
  epsom?: number;
  tableSalt?: number;
  bakingSoda?: number;
  calciumChloride?: number;
  chalkDissolved?: number;
  chalkUndissolved?: number;
  magnesiumChloride?: number;
  
}

/**
 * LPSolver result
 */
interface Result {
  vertices: ResultVertice[]
}

/**
 * Automatically determine salt additions for brewing water.
 */
export default class SaltOptimizer {

  private waterCalculator: WaterCalculator;
  private targetWaterProfile: WaterProfile;
  private salts: Salt[];  

  /**
   * Constuctor
   * 
   * @param waterCalculator water calculator
   * @param targetWaterProfile target water profile
   * @param salts used salts
   */
  constructor(waterCalculator: WaterCalculator, targetWaterProfile: WaterProfile, salts: Salt[]) {
    this.waterCalculator = waterCalculator;
    this.targetWaterProfile = targetWaterProfile;
    this.salts = salts;
  }

  /**
   * Optimizes salts
   * 
   * @return optimized salt concentrations
   */
  public optimizeSalts(): SaltConcentrations {
    const initialWaterProfile = this.waterCalculator.getInitialWaterProfile();
    const recommendedIonConcentrations = this.waterCalculator.getRecommendedIonConcentrations();
    const optimize: { [variable: string]: "max" | "min" } = {};
    const constraints: { [variable : string]: IModelVariableConstraint } = {};
    const variables: { [variable: string]: { [variable: string]: number } } = {};

    this.salts.forEach(salt => {
      const ions = saltIonMap[salt];
      variables[salt] = { };

      ionList.forEach(ion => {
        variables[salt][ion] = ions[ion]?.getValue("mg/l") || 0;
      });
    });

    ionList.forEach(ion => {
      const initialIons = initialWaterProfile[ion]?.getValue("mg/l") || 0;
      const targetIons = this.targetWaterProfile[ion]?.getValue("mg/l") || 0;
      const recommendedMin = recommendedIonConcentrations[ion].min.getValue("mg/l") || 0;
      const recommendedMax = recommendedIonConcentrations[ion].min.getValue("mg/l") || 0;

      const targetChange = targetIons - initialIons;
      optimize[ion] = targetChange > 0 ? "max" : "min";
      constraints[ion] = {
        "min": Math.max(recommendedMin, Math.min(targetChange, 0)),
        "max": Math.min(recommendedMax ,Math.max(0, targetChange))
      };
    });

    const model: IMultiObjectiveModel<string, string> = {
      optimize: optimize,
      constraints: constraints,
      variables: variables,
      options: {
        tolerance: 1
      }
    };

    const result: Result = LPSolver.MultiObjective(model) as Result;
    const resultSaltConcentrations = result.vertices.map(this.getResultVerticeSaltConcentrations);
    
    resultSaltConcentrations.sort((a, b) => {
      return this.getWaterProfileTotalError(a) - this.getWaterProfileTotalError(b);
    });
    
    return resultSaltConcentrations[0];
  }

  /**
   * Convert LPSolver vertice into salt concentrations
   * 
   * @param vertice LPSolver vertice
   * @returns salt concentrations
   */
  private getResultVerticeSaltConcentrations = (vertice: ResultVertice) => {
    const { bakingSoda, calciumChloride, chalkDissolved, epsom, gypsum, magnesiumChloride, tableSalt } = vertice;

    return {
      bakingSoda: this.getMassConcentrationValue(bakingSoda),
      calciumChloride: this.getMassConcentrationValue(calciumChloride),
      chalkDissolved: this.getMassConcentrationValue(chalkDissolved),
      epsom: this.getMassConcentrationValue(epsom),
      gypsum: this.getMassConcentrationValue(gypsum),
      magnesiumChloride: this.getMassConcentrationValue(magnesiumChloride),
      tableSalt: this.getMassConcentrationValue(tableSalt),
    };
  }

  /**
   * Calculates water profile total errors if given salts were used
   * 
   * @param saltConcentrations salt concentrations
   * @returnss water profile total errors if given salts were used
   */
  private getWaterProfileTotalError = (saltConcentrations: SaltConcentrations) => {
    const waterCalculator = new WaterCalculator();
    waterCalculator.setWaterVolume(this.waterCalculator.getWaterVolume());
    waterCalculator.setInitialWaterProfile(this.waterCalculator.getInitialWaterProfile());
    waterCalculator.setSaltConcentrations(saltConcentrations);
    return waterCalculator.getWaterProfileTotalError(this.targetWaterProfile);
  }

  /**
   * Returns numeric mg/l value as MassConcentrationValue
   * 
   * @param value numeric mg/l value
   * @returns MassConcentrationValue
   */
  private getMassConcentrationValue(value?: number) {
    return new MassConcentrationValue("mg/l", value || 0, NaN, NaN);
  }

}
