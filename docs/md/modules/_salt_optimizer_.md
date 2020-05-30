[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["salt-optimizer"](_salt_optimizer_.md)

# Module: "salt-optimizer"

## Index

### Classes

* [SaltOptimizer](../classes/_salt_optimizer_.saltoptimizer.md)

### Interfaces

* [Constraint](../interfaces/_salt_optimizer_.constraint.md)
* [MatrixProblem](../interfaces/_salt_optimizer_.matrixproblem.md)
* [Objective](../interfaces/_salt_optimizer_.objective.md)
* [Output](../interfaces/_salt_optimizer_.output.md)
* [OutputAdditions](../interfaces/_salt_optimizer_.outputadditions.md)
* [Problem](../interfaces/_salt_optimizer_.problem.md)

### Type aliases

* [Solution](_salt_optimizer_.md#solution)

### Object literals

* [ionRelativeImportances](_salt_optimizer_.md#const-ionrelativeimportances)
* [residualAlkalinityContributions](_salt_optimizer_.md#const-residualalkalinitycontributions)

## Type aliases

###  Solution

Ƭ **Solution**: *number[]*

*Defined in [salt-optimizer.ts:37](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L37)*

Type for problem solution

## Object literals

### `Const` ionRelativeImportances

### ▪ **ionRelativeImportances**: *object*

*Defined in [salt-optimizer.ts:42](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L42)*

Map of ion relative importance

###  bicarbonate

• **bicarbonate**: *number* = 1

*Defined in [salt-optimizer.ts:48](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L48)*

###  calcium

• **calcium**: *number* = 1

*Defined in [salt-optimizer.ts:43](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L43)*

###  chloride

• **chloride**: *number* = 100

*Defined in [salt-optimizer.ts:47](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L47)*

###  magnesium

• **magnesium**: *number* = 10

*Defined in [salt-optimizer.ts:44](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L44)*

###  sodium

• **sodium**: *number* = 10

*Defined in [salt-optimizer.ts:45](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L45)*

###  sulfate

• **sulfate**: *number* = 100

*Defined in [salt-optimizer.ts:46](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L46)*

___

### `Const` residualAlkalinityContributions

### ▪ **residualAlkalinityContributions**: *object*

*Defined in [salt-optimizer.ts:54](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L54)*

Residual alkalinity contributors

###  bicarbonate

• **bicarbonate**: *number* = 0.8197

*Defined in [salt-optimizer.ts:55](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L55)*

###  calcium

• **calcium**: *number* = -0.7143

*Defined in [salt-optimizer.ts:56](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L56)*

###  magnesium

• **magnesium**: *number* = -0.5882

*Defined in [salt-optimizer.ts:57](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L57)*
