import numeric from "numeric";
import { WaterProfile } from "./water-profile";
import { VolumeValue, AlkalinityValue, MassConcentrationValue, CalciumValue, MagnesiumValue, SodiumValue, SulfateValue, ChlorideValue, BicarbonateValue } from "./units";
import { saltIonMap, Ion, ionList } from "./ions";
import { Salt, saltList } from "./salts";

/**
 * Interface that describes output salt additions object
 */
export interface OutputAdditions {
  bakingSoda?: MassConcentrationValue;
  calciumChloride?: MassConcentrationValue;
  epsom?: MassConcentrationValue;
  gypsum?: MassConcentrationValue;
  magnesiumChloride?: MassConcentrationValue;
  tableSalt?: MassConcentrationValue
  chalkUndissolved?: MassConcentrationValue,
  chalkDissolved?: MassConcentrationValue
}

/**
 * Interface that describes optimizer output
 */
export interface Output {
  strikeAdditions: OutputAdditions;
  spargeAdditions: OutputAdditions;
  residualAlkalinity: number;
  residualAlkalinityError: number
};

/**
 * Type for problem solution
 */
type Solution = number[];

/**
 * Map of ion relative importance
 */
const ionRelativeImportances = {
  calcium: 1.0,
  magnesium: 10.0,
  sodium: 10.0,
  sulfate: 100.0,
  chloride: 100.0,
  bicarbonate: 1.0
}

/**
 * Residual alkalinity contributors
 */
const residualAlkalinityContributions = {
  bicarbonate: 0.8197,
  calcium: -0.7143,
  magnesium: -0.5882,
};

/**
 * Interface describing problem constaint
 */
interface Constraint {
  rhs: number,
  lhs: {
    abse_calcium?: number;
    abse_magnesium?: number;
    abse_sodium?: number;
    abse_sulfate?: number;
    abse_chloride?: number;
    abse_bicarbonate?: number;
    abse_residualAlkalinity?: number;
    e_calcium?: number;
    e_magnesium?: number;
    e_sodium?: number;
    e_sulfate?: number;
    e_chloride?: number;
    e_bicarbonate?: number;
    e_residualAlkalinity?: number;
  }
}

/**
 * Interface describing problem
 */
interface Problem {
  objective: Objective
  i_constraints: Constraint[],
  e_constraints: Constraint[]
}

/**
 * Interface describing problem in matrix form
 */
interface MatrixProblem {
  variables: any,
  objective: any,
  i_constraints: any,
  i_limits: any,
  e_constraints: any
  e_limits: any
}

/**
 * Interface describing objective
 */
interface Objective {
  abse_residualAlkalinity: number,
  abse_calcium: number,
  abse_magnesium: number,
  abse_sodium: number,
  abse_sulfate: number,
  abse_chloride: number,
  abse_bicarbonate: number,

  gypsum?: number;
  epsom?: number;
  tableSalt?: number;
  bakingSoda?: number;
  calciumChloride?: number;
  chalkDissolved?: number;
  chalkUndissolved?: number;
  magnesiumChloride?: number;

  sparge_gypsum?: number,
  sparge_epsom?: number,
  sparge_tableSalt?: number,
  sparge_bakingSoda?: number,
  sparge_calciumChloride?: number,
  sparge_magnesiumChloride?: number,
  sparge_chalkDissolved?: number
  sparge_chalkUndissolved?: number
}

/**
 * Automatically determine salt additions for brewing water.
 * 
 * This class is based on following GitHub project:
 * 
 * https://github.com/jcipar/brewing-salts/
 */
export default class SaltOptimizer {

  private initialWaterProfile: WaterProfile;
  private targetWaterProfile: WaterProfile;
  private targetResidualAlkalinity: AlkalinityValue;
  private salts: Salt[];
  private strikeVolume: VolumeValue;
  private spargeVolume: VolumeValue;

  /**
   * Constuctor
   * 
   * @param initialWaterProfile initial water profile
   * @param targetWaterProfile  target water profile
   * @param targetResidualAlkalinity target residual alkalinity
   * @param strikeVolume strike water volume
   * @param spargeVolume sparge water volume
   * @param salts used salts
   */
  constructor(initialWaterProfile: WaterProfile, targetWaterProfile: WaterProfile, targetResidualAlkalinity: AlkalinityValue, strikeVolume: VolumeValue, spargeVolume: VolumeValue, salts: Salt[]) {
    this.initialWaterProfile = initialWaterProfile;
    this.targetWaterProfile = targetWaterProfile;
    this.targetResidualAlkalinity = targetResidualAlkalinity;
    this.strikeVolume = strikeVolume;
    this.spargeVolume = spargeVolume;
    this.salts = salts;
  }

  /**
   * Optimizes salts
   * 
   * @param input input
   * @return output
   */
  public optimizeSalts(): Output {
    const problem = this.setupProblem(); 
    const problemMatrix = this.convertProblemToMatrix(problem);
    const result = numeric.solveLP(problemMatrix.objective, 
      problemMatrix.i_constraints,
      problemMatrix.i_limits,
      problemMatrix.e_constraints,
      problemMatrix.e_limits
    );

    const solution = numeric.trunc(result.solution, 1e-4);

    return this.convertSolutionToOuput(problemMatrix, solution);
  }
  
  /**
   * Sets up the problem using values from input 
   * 
   * @returns problem
   */
  private setupProblem(): Problem {
    const problem: Problem = {
      i_constraints: [], 
      e_constraints: [],
      objective: this.problemObjective()
    };

    problem.i_constraints = problem.i_constraints.concat(this.absConstraints());
    problem.i_constraints = problem.i_constraints.concat(this.setupLimitConstraints());
    problem.e_constraints = problem.e_constraints.concat(this.setupIonEConstraints());
    problem.e_constraints = problem.e_constraints.concat(this.setupResidualAlkalinityConstraints());
    
    return problem;
  }
  
  /**
   * Sets up problem objective
   * 
   * @returns problem objective
   */
  private problemObjective(): Objective {
    const objective: Objective = {
      abse_residualAlkalinity: 1000.0,
      abse_bicarbonate: ionRelativeImportances.bicarbonate,
      abse_calcium: ionRelativeImportances.calcium,
      abse_magnesium: ionRelativeImportances.magnesium,
      abse_sodium: ionRelativeImportances.sodium,
      abse_sulfate: ionRelativeImportances.sulfate,
      abse_chloride: ionRelativeImportances.chloride,
    };
    
    // L1 regularizer to encourage sparse solutions.
    // These regularizer terms need to be pretty high, but
    // that won't interfere with the solution, since all of
    // the coefficients that use the variables are at least
    // 14.

    this.salts.forEach((salt) => {
      (objective as any)[salt] = 1.0;
      if (this.hasSparge() && !this.isAlkalineMineral(salt as Salt)){
          (objective as any)["sparge_" + salt] = 1.0;
      }
    });
    
    return objective;
  }

  /**
   * Returns whether sparge water volume is given or not
   * 
   * @returns whether sparge water volume is given or not
   */
  private hasSparge = () => {
    return this.spargeVolume && this.spargeVolume.getValue("l") > 0;
  }
  
  /**
   * Sets up constaints
   * 
   * @returns list of input constaints
   */
  private absConstraints(): Constraint[] {
    const result: Constraint[] = [
      this.absConstraint("residualAlkalinity", -1.0),
      this.absConstraint("residualAlkalinity", 1.0)
    ];

    const ions = ionList.filter(ion => this.targetWaterProfile[ion]?.getValue("mg/l") || 0 > 0);
    
    return result.concat(ions.map(ion => this.absConstraint(ion, -1.0))).concat(ions.map(ion => this.absConstraint(ion, 1.0)));    
  }

  /**
   * Sets up a constaint
   * 
   * @returns constaint
   */
  private absConstraint(name: string, vne: number): Constraint {
    const lhs: any = {};
    lhs[`abse_${name}`] = -1.0;
    lhs[`e_${name}`] = vne;

    return {
      "rhs": 0.0, 
      "lhs": lhs
    };
  }
  
  /**
   * Sets up limit constraints
   */
  private setupLimitConstraints(): Constraint[] {
    const constraints: Constraint[] = [];

    this.salts.forEach((salt) => {
      constraints.push(this.nonNegative(salt));
      const cons: any = {"rhs": 1000, "lhs": {}};
      cons.lhs[salt] = 1.0;

      if (this.hasSparge() && !this.isAlkalineMineral(salt as Salt)) {
        constraints.push(this.nonNegative("sparge_" + salt));
        cons.lhs["sparge_" + salt] = 1.0;
      }

      constraints.push(cons);
    });
    
    return constraints;
  }
  
  /**
   * Makes non negative constraint
   * 
   * @param variable variable
   * @returns constraint 
   */
  private nonNegative(variable: string): Constraint {
    const cons = {"rhs": 0.0, "lhs": {}};
    (cons.lhs as any)[variable] = -1.0;
    return cons;
  }
  
  /**
   * Returns map of ion salts
   * 
   * @returns map of ion salts
   */
  private getIonSaltMap(): { [key: string]: any } {
    const im: any = {};

    saltList.forEach((salt: Salt) => {
      const ions = saltIonMap[salt];

      Object.keys(ions).forEach((ion: Ion) => {
        if (! (ion in im)) { im[ion] = {}; }
        im[ion][salt] = ions[ion].getValue("mg/l");
      });
    });

    return im;
  }
  
  /**
   * Sets up ion constraint
   * 
   * @returns constaints
   */
  private setupIonEConstraints(): Constraint[] {
    const constraints: Constraint[] = []
    const ionMap = this.getIonSaltMap();
    const strikeLiters = this.strikeVolume.getValue("l") || 0;
    const spargeLiters = this.spargeVolume.getValue("l") || 0;
    const totalLiters = strikeLiters + spargeLiters;

    ionList.forEach(ion => {
      const initialIons = this.initialWaterProfile[ion]?.getValue("mg/l") || 0;
      const targetIons = this.targetWaterProfile[ion]?.getValue("mg/l") || 0;

      const cons1 = {"rhs": -initialIons, "lhs": {}};
      (cons1 as any).lhs["mash_" + ion] = -1.0;

      const sparge_cons = {"rhs": -initialIons, "lhs": {}};
      (sparge_cons as any).lhs["sparge_" + ion] = -1.0;

      this.salts.forEach((salt) => {
        if (salt in ionMap[ion]) {
          (cons1.lhs as any)[salt] = ionMap[ion][salt];
          if (this.hasSparge() && !this.isAlkalineMineral(salt as Salt)) {
            (sparge_cons.lhs as any)["sparge_" + salt] = ionMap[ion][salt];
          }
        }
      });

      constraints.push(cons1);

      if (this.hasSparge()) {
        constraints.push(sparge_cons);
      }

      const cons2 = {"rhs": targetIons, "lhs": {}};
      (cons2.lhs as any)["mash_" + ion] = strikeLiters / totalLiters;
      (cons2.lhs as any)["e_" + ion] = 1.0;
      
      if (this.hasSparge()) {
          (cons2.lhs as any)["sparge_" + ion] = spargeLiters / totalLiters;
      }

      constraints.push(cons2);
    });

    return constraints;
  }
  
  /**
   * Sets up residual alkalinity constraints
   * 
   * @returns constaints
   */
  private setupResidualAlkalinityConstraints() {
    const constraints = []
    
    const cons1 = {"rhs": 0.0, "lhs": {
      residualAlkalinity: -1,
      mash_bicarbonate: residualAlkalinityContributions.bicarbonate,
      mash_calcium: residualAlkalinityContributions.calcium,
      mash_magnesium: residualAlkalinityContributions.magnesium
    }};

    constraints.push(cons1);

    const cons2 = {"rhs": this.targetResidualAlkalinity.getValue("mg/l"), "lhs": {}};
    (cons2.lhs as any)["residualAlkalinity"] = 1.0;
    (cons2.lhs as any)["e_residualAlkalinity"] = 1.0;
    constraints.push(cons2);

    return constraints;
  }
  
  /**
   * Returns whether salt is an alkaline mineral
   * 
   * @param salt salt
   * @returns whether salt is an alkaline mineral
   */
  private isAlkalineMineral(salt: Salt) {
    return saltIonMap[salt].bicarbonate && saltIonMap[salt].bicarbonate.getValue("mg/l") > 0;
  }
  
  /**
   * Converts problem to matrix problem 
   * 
   * @param problem problem 
   * @returns matrix problem
   */
  private convertProblemToMatrix(problem: Problem): MatrixProblem {
    const variables = this.extractVariables(problem);
    const objective = this.getFilledArray(0.0, variables.number_name.length);
    const i_constraints = this.getFilledMatrix(0.0, problem.i_constraints.length, variables.number_name.length);
    const i_limits = this.getFilledArray(0.0, problem.i_constraints.length);

    for (let v in problem.objective) {
      const vnr = (variables.name_number as any)[v];
      objective[vnr] = (problem.objective as any)[v];
    }

    for (let cnr in problem.i_constraints) {
      i_limits[cnr] = (problem.i_constraints[cnr] as any).rhs;
      
      for (let v in problem.i_constraints[cnr].lhs) {
        const vnr = (variables.name_number as any)[v];
        i_constraints[cnr][vnr] = (problem.i_constraints[cnr] as any).lhs[v];
      }
    }

    const e_constraints = this.getFilledMatrix(0.0, problem.e_constraints.length, variables.number_name.length);
    const e_limits = this.getFilledArray(0.0, problem.e_constraints.length);

    for (let cnr in problem.e_constraints) {
      e_limits[cnr] = (problem.e_constraints[cnr] as any).rhs;
      
      for (let v in (problem.e_constraints[cnr] as any).lhs) {
        const vnr = (variables.name_number as any)[v];
        e_constraints[cnr][vnr] = (problem.e_constraints[cnr] as any).lhs[v];
      }
    }

    return {
      "variables": variables,
      "objective": objective,
      "i_constraints": i_constraints,
      "i_limits": i_limits,
      "e_constraints": e_constraints,
      "e_limits": e_limits
    }
  }
  
  /**
   * Returns prefilled array 
   * 
   * @param value initial values
   * @param size size of array
   * @returns prefilled array
   */
  private getFilledArray(value: number, size: number): number[] {
    return new Array(size).fill(value);
  }
  
  /**
   * Returns prefilled matrix
   * 
   * @param value initial values
   * @param height height
   * @param width width
   * @returns prefilled matrix
   */
  private getFilledMatrix(value: number, height: number, width: number): number[][] {
    const result = [];

    for (let i = 0; i < height; i++) {
      result.push(this.getFilledArray(value, width));
    }

    return result;
  }
  
  /**
   * Extracts variables from problem
   * 
   * @param problem problem
   * @returns variables
   */
  private extractVariables(problem: Problem) {
    const variables: any = {"name_number": {}, "number_name": []};

    for (let v in problem["objective"]) {
      if (! (v in variables.name_number)) {
        const nr = variables.number_name.length;
        (variables.name_number as any)[v] = nr;
        variables.number_name.push(v);
      }
    }

    for (let cnr in problem.i_constraints) {
      for (let v in problem.i_constraints[cnr].lhs){
        if (! (v in variables.name_number)) {
          const nr = variables.number_name.length;
          (variables.name_number as any)[v] = nr;
          variables.number_name.push(v);
        }
      }
    }

    for (let cnr in problem.e_constraints) {
      for (let v in (problem.e_constraints[cnr] as any).lhs){
        if (! (v in variables.name_number)) {
            const nr = variables.number_name.length;
            (variables.name_number as any)[v] = nr;
            variables.number_name.push(v);
        }
      }
    }

    return variables;
  }
  
  /**
   * Converts solution to JSON format
   * 
   * @param mproblem matrix problem
   * @param solution solution
   * @returns output
   */
  private convertSolutionToOuput(mproblem: MatrixProblem, solution: Solution): Output {
    const result: Output = {
      "strikeAdditions": {},
      "spargeAdditions": {},
      residualAlkalinity: 0,
      residualAlkalinityError: 0
    };
    
    saltList.forEach((salt) => {
      const spargeSalt = "sparge_" + salt;
      result.strikeAdditions[salt] = new MassConcentrationValue("mg/l", this.getValue(mproblem, solution, salt) || 0, NaN, NaN);
      result.spargeAdditions[salt] = new MassConcentrationValue("mg/l", this.getValue(mproblem, solution, spargeSalt) || 0, NaN, NaN);
    });
    
    const ra_nr = (mproblem.variables.name_number as any)["residualAlkalinity"];
    result.residualAlkalinity = (solution as any)[ra_nr];
    const era_nr = mproblem.variables.name_number["e_residualAlkalinity"];
    result.residualAlkalinityError = (solution as any)[era_nr];

    return result;
  }
  
  /**
   * Returns variable value
   * 
   * @param mproblem matrix problem
   * @param solution solution
   * @param name variable name
   * @returns variable value
   */
  private getValue(mproblem: MatrixProblem, solution: Solution, name: string) {
    const snr = mproblem.variables.name_number[name];
    return solution[snr];
  }

}