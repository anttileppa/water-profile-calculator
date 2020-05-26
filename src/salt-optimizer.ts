import numeric from "numeric";
import { WaterProfile } from "./water-profile";
import { VolumeValue, MassValue, AlkalinityValue } from "./units";
import { saltIonMap, Ion, ionList } from "./salt-ions";
import { Salt, saltList } from "./salts";

export interface Ions {
  calcium?: number,
  magnesium?: number,
  sodium?: number,
  sulfate?: number,
  chloride?: number,
  bicarbonate?: number
}

export interface Salts {
  gypsum?: number;
  epsom?: number;
  tableSalt?: number;
  bakingSoda?: number;
  calciumChloride?: number;
  magnesiumChloride?: number;
  chalkDissolved?: number;
  chalkUndissolved?: number;
}

export interface Input {
  maxSalts: Salts;
}

export interface OutputAdditions {
  bakingSoda?: MassValue;
  calciumChloride?: MassValue;
  epsom?: MassValue;
  gypsum?: MassValue;
  lactic?: MassValue;
  magnesiumChloride?: MassValue;
  phosphoric?: MassValue;
  sauermalz?: MassValue;
  tableSalt?: MassValue
  chalkUndissolved?: MassValue,
  chalkDissolved?: MassValue
}

export interface Output {
  strikeAdditions: OutputAdditions;
  spargeAdditions: OutputAdditions;
  ions: Ions;
  ionsAdded: Ions;
  ionErrors: Ions;
  residualAlkalinity: number;
  residualAlkalinityError: number
};

type Solution = number[];

interface Parameters {
  ions: { [key in Ion]: number },
  max_ions: { [key in Ion]: number },
  residualAlkalinity_contributions: {
    bicarbonate: number
    calcium: number,
    magnesium: number
  }
}

const parameters: Parameters = {
  ions: {  // Map ion->relative_importance
      calcium: 1.0,
      magnesium: 10.0,
      sodium: 10.0,
      sulfate: 100.0,
      chloride: 100.0,
      bicarbonate: 1.0,
  },
  max_ions: {
      calcium: 150.0,
      magnesium: 30.0,
      sodium: 150.0,
      sulfate: 150.0,
      chloride: 250.0,
      bicarbonate: 250.0,
  },
  residualAlkalinity_contributions: {
      bicarbonate: 0.8197,
      calcium: -0.7143,
      magnesium: -0.5882,
  }
}

interface IConstraint {
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

interface EConstraint {

}

interface Problem {
  objective: Objective
  i_constraints: IConstraint[],
  e_constraints: EConstraint[]
}

interface MatrixProblem {
  variables: any,
  objective: any,
  i_constraints: any,
  i_limits: any,
  e_constraints: any
  e_limits: any
}

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

export interface SaltOptimizerParams {
  salts: {
    gypsum: boolean,
    epsom: boolean,
    tableSalt: boolean,
    calciumChloride: boolean,
    magnesiumChloride: boolean,
    bakingSoda: boolean,
    chalkDissolved: boolean
  }
}

/**
 * Automatically determine salt additions for brewing water.
 * 
 * Initial version of this code is from GitHub project:
 * 
 * https://github.com/jcipar/brewing-salts/
 */
export default class SaltOptimizer {

  private initialWaterProfile: WaterProfile;
  private targetWaterProfile: WaterProfile;
  private targetResidualAlkalinity: AlkalinityValue;
  private params: SaltOptimizerParams;
  private strikeVolume: VolumeValue;
  private spargeVolume: VolumeValue;

  constructor(initialWaterProfile: WaterProfile, targetWaterProfile: WaterProfile, targetResidualAlkalinity: AlkalinityValue, strikeVolume: VolumeValue, spargeVolume: VolumeValue, params: SaltOptimizerParams) {
    this.initialWaterProfile = initialWaterProfile;
    this.targetWaterProfile = targetWaterProfile;
    this.targetResidualAlkalinity = targetResidualAlkalinity;
    this.strikeVolume = strikeVolume;
    this.spargeVolume = spargeVolume;
    this.params = params;
  }

  /**
   * Optimizes salts
   * 
   * @param input input
   * @return output
   */
  public optimizeSalts(): Output {
    const maxSalts: Salts = {};

    if (this.params.salts.bakingSoda) {
      maxSalts.bakingSoda = 1000.0;
    }

    if (this.params.salts.calciumChloride) {
      maxSalts.calciumChloride = 1000.0;
    }

    if (this.params.salts.gypsum) {
      maxSalts.gypsum = 1000.0;
    }

    if (this.params.salts.epsom) {
      maxSalts.epsom = 1000.0;
    }

    if (this.params.salts.tableSalt) {
      maxSalts.tableSalt = 1000.0;
    }

    if (this.params.salts.magnesiumChloride) {
      maxSalts.magnesiumChloride = 1000.0;
    }

    if (this.params.salts.chalkDissolved) {
      maxSalts.chalkDissolved = 1000.0;
    }

    const input: Input = {
      maxSalts: maxSalts,
    };

    const problem = this.setupProblem(input); 
    const problemMatrix = this.convertProblemToMatrix(problem);
    const result = numeric.solveLP(problemMatrix.objective, 
      problemMatrix.i_constraints,
      problemMatrix.i_limits,
      problemMatrix.e_constraints,
      problemMatrix.e_limits
    );

    const solution: Solution = numeric.trunc(result.solution, 1e-4);

    return this.convertSolutionToJson(input, problemMatrix, solution);
  }
  
  /**
   * Sets up the problem using values from input 
   * 
   * @param input input
   * @returns problem
   */
  private setupProblem(input: Input): Problem {
    const problem: Problem = {
      i_constraints: [], 
      e_constraints: [],
      objective: this.problemObjective(input)
    };

    problem.i_constraints = problem.i_constraints.concat(this.absConstraints());
    problem.i_constraints = problem.i_constraints.concat(this.setupLimitConstraints(input));
    problem.e_constraints = problem.e_constraints.concat(this.setupIonEConstraints(input));
    problem.e_constraints = problem.e_constraints.concat(this.setupResidualAlkalinityConstraints(input));
    
    return problem;
  }
  
  /**
   * Sets up problem objective from input
   * 
   * @param input input
   * @returns problem objective
   */
  private problemObjective(input: Input): Objective {
    // Check that these "any" params are properly used. 

    const objective: Objective = {
      abse_residualAlkalinity: 1000.0,
      abse_bicarbonate: parameters.ions.bicarbonate,
      abse_calcium: parameters.ions.calcium,
      abse_magnesium: parameters.ions.magnesium,
      abse_sodium: parameters.ions.sodium,
      abse_sulfate: parameters.ions.sulfate,
      abse_chloride: parameters.ions.chloride,
    };
    
    // L1 regularizer to encourage sparse solutions.
    // These regularizer terms need to be pretty high, but
    // that won't interfere with the solution, since all of
    // the coefficients that use the variables are at least
    // 14.

    for (let salt in input.maxSalts) {
      (objective as any)[salt] = 1.0;
      if (this.hasSparge() && !this.isAlkalineMineral(salt as Salt)){
          (objective as any)["sparge_" + salt] = 1.0;
      }
    }
    
    return objective;
  }

  private hasSparge = () => {
    return this.spargeVolume && this.spargeVolume.getValue("l") > 0;
  }
  
  /**
   * Sets up absolute input constraints
   * 
   * @returns list of input constraints
   */
  private absConstraints(): IConstraint[] {
    let constraints: IConstraint[] = [];
    constraints = constraints.concat(this.absConstraint('residualAlkalinity'));

    ionList.forEach((ion) => {
      if (this.targetWaterProfile[ion].getValue("mg/l") > 0) {
        constraints = constraints.concat(this.absConstraint(ion));
      }
    });

    return constraints;
  }
  
  /**
   * Sets up an absolute constraint
   * 
   * @param ion ion
   * @returns constaints
   */
  private absConstraint(ion: Ion | "residualAlkalinity"): IConstraint[] {
    const constraints: IConstraint[] = [];
    const vna = "abse_" + ion;
    const vne = "e_" + ion;

    const constraint1: IConstraint = {"rhs": 0.0, "lhs": { }};
    (constraint1.lhs as any)[vna] = -1.0;
    (constraint1.lhs as any)[vne] = 1.0;
    constraints.push(constraint1);

    const constraint2: IConstraint = {"rhs": 0.0, "lhs": { }};
    (constraint2.lhs as any)[vna] = -1.0;
    (constraint2.lhs as any)[vne] = -1.0;
    constraints.push(constraint2);
    
    return constraints;
  }
  
  /**
   * Sets up limit constraints
   * 
   * @param input input
   */
  private setupLimitConstraints(input: Input): IConstraint[] {
    const constraints = [];

    for (let salt in input.maxSalts) {
      constraints.push(this.nonNegative(salt));
      const cons: any = {"rhs": (input.maxSalts as any)[salt], "lhs": {}};
      cons.lhs[salt] = 1.0;

      if (this.hasSparge() && !this.isAlkalineMineral(salt as Salt)) {
        constraints.push(this.nonNegative("sparge_" + salt));
        cons.lhs["sparge_" + salt] = 1.0;
      }

      constraints.push(cons);
    };
    
    return constraints;
  }
  
  /**
   * Makes non negative constraint
   * 
   * @param variable variable
   * @returns constraint 
   */
  private nonNegative(variable: string): IConstraint {
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
        im[ion][salt] = ions[ion].getValue("g/gal");
      });
    });

    return im;
  }
  
  /**
   * Sets up ion constraint
   * 
   * @param input input
   * @returns constaints
   */
  private setupIonEConstraints(input: Input): EConstraint[] {
    const constraints: EConstraint[] = []
    const ionMap = this.getIonSaltMap();
    const strikeLiters = this.strikeVolume.getValue("l") || 0;
    const spargeLiters = this.spargeVolume.getValue("l") || 0;
    const totalLiters = strikeLiters + spargeLiters;

    ionList.forEach(ion => {
      const initialIons = this.initialWaterProfile[ion].getValue("mg/l");
      const targetIons = this.targetWaterProfile[ion].getValue("mg/l");

      const cons1 = {"rhs": -initialIons, "lhs": {}};
      (cons1 as any).lhs["mash_" + ion] = -1.0;

      const sparge_cons = {"rhs": -initialIons, "lhs": {}};
      (sparge_cons as any).lhs["sparge_" + ion] = -1.0;

      for (let salt in input.maxSalts) {
        if (salt in ionMap[ion]) {
          (cons1.lhs as any)[salt] = ionMap[ion][salt];
          if (this.hasSparge() && !this.isAlkalineMineral(salt as Salt)) {
            (sparge_cons.lhs as any)["sparge_" + salt] = ionMap[ion][salt];
          }
        }
      }

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
   * @param input input
   * @returns constaints
   */
  private setupResidualAlkalinityConstraints(input: Input) {
    const constraints = []
    const cons1 = {"rhs": 0.0, "lhs": {}};
    (cons1.lhs as any)["residualAlkalinity"] = -1;
    for (let ion in parameters.residualAlkalinity_contributions) {
        (cons1.lhs as any)["mash_" + ion] = (parameters.residualAlkalinity_contributions as any)[ion];
    }
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
   * @param input input
   * @param mproblem matrix problem
   * @param solution solution
   * @returns output
   */
  private convertSolutionToJson(input: Input, mproblem: MatrixProblem, solution: Solution): Output {
    const result: Output = {
      "strikeAdditions": {},
      "spargeAdditions": {},
      "ions" : {},
      "ionsAdded": {},
      "ionErrors": {},
      residualAlkalinity: 0,
      residualAlkalinityError: 0
    };
    
    saltList.forEach((salt) => {
      const spargeSalt = "sparge_" + salt;
      result.strikeAdditions[salt] = new MassValue("g", this.getValue(mproblem, solution, salt) || 0);
      result.spargeAdditions[salt] = new MassValue("g", this.getValue(mproblem, solution, spargeSalt) || 0);
    });

    ionList.forEach(ion => {
      const initialIons = this.initialWaterProfile[ion].getValue("mg/l");
      const targetIons = this.targetWaterProfile[ion].getValue("mg/l");
      const iname = "e_" + ion;
      const inr = mproblem.variables.name_number[iname];
      result.ionErrors[ion] = (solution as any)[inr];
      result.ions[ion] = targetIons - (solution as any)[inr];
      result.ionsAdded[ion] = targetIons - (solution as any)[inr] - initialIons;
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