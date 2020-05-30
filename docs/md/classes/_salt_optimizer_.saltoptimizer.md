[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["salt-optimizer"](../modules/_salt_optimizer_.md) › [SaltOptimizer](_salt_optimizer_.saltoptimizer.md)

# Class: SaltOptimizer

Automatically determine salt additions for brewing water.

This class is based on following GitHub project:

https://github.com/jcipar/brewing-salts/

## Hierarchy

* **SaltOptimizer**

## Index

### Constructors

* [constructor](_salt_optimizer_.saltoptimizer.md#constructor)

### Properties

* [initialWaterProfile](_salt_optimizer_.saltoptimizer.md#private-initialwaterprofile)
* [salts](_salt_optimizer_.saltoptimizer.md#private-salts)
* [spargeVolume](_salt_optimizer_.saltoptimizer.md#private-spargevolume)
* [strikeVolume](_salt_optimizer_.saltoptimizer.md#private-strikevolume)
* [targetResidualAlkalinity](_salt_optimizer_.saltoptimizer.md#private-targetresidualalkalinity)
* [targetWaterProfile](_salt_optimizer_.saltoptimizer.md#private-targetwaterprofile)

### Methods

* [absConstraint](_salt_optimizer_.saltoptimizer.md#private-absconstraint)
* [absConstraints](_salt_optimizer_.saltoptimizer.md#private-absconstraints)
* [convertProblemToMatrix](_salt_optimizer_.saltoptimizer.md#private-convertproblemtomatrix)
* [convertSolutionToOuput](_salt_optimizer_.saltoptimizer.md#private-convertsolutiontoouput)
* [extractVariables](_salt_optimizer_.saltoptimizer.md#private-extractvariables)
* [getFilledArray](_salt_optimizer_.saltoptimizer.md#private-getfilledarray)
* [getFilledMatrix](_salt_optimizer_.saltoptimizer.md#private-getfilledmatrix)
* [getIonSaltMap](_salt_optimizer_.saltoptimizer.md#private-getionsaltmap)
* [getValue](_salt_optimizer_.saltoptimizer.md#private-getvalue)
* [hasSparge](_salt_optimizer_.saltoptimizer.md#private-hassparge)
* [isAlkalineMineral](_salt_optimizer_.saltoptimizer.md#private-isalkalinemineral)
* [nonNegative](_salt_optimizer_.saltoptimizer.md#private-nonnegative)
* [optimizeSalts](_salt_optimizer_.saltoptimizer.md#optimizesalts)
* [problemObjective](_salt_optimizer_.saltoptimizer.md#private-problemobjective)
* [setupIonEConstraints](_salt_optimizer_.saltoptimizer.md#private-setupioneconstraints)
* [setupLimitConstraints](_salt_optimizer_.saltoptimizer.md#private-setuplimitconstraints)
* [setupProblem](_salt_optimizer_.saltoptimizer.md#private-setupproblem)
* [setupResidualAlkalinityConstraints](_salt_optimizer_.saltoptimizer.md#private-setupresidualalkalinityconstraints)

## Constructors

###  constructor

\+ **new SaltOptimizer**(`initialWaterProfile`: [WaterProfile](../interfaces/_water_profile_.waterprofile.md), `targetWaterProfile`: [WaterProfile](../interfaces/_water_profile_.waterprofile.md), `targetResidualAlkalinity`: [AlkalinityValue](_units_.alkalinityvalue.md), `strikeVolume`: [VolumeValue](_units_.volumevalue.md), `spargeVolume`: [VolumeValue](_units_.volumevalue.md), `salts`: [Salt](../modules/_salts_.md#salt)[]): *[SaltOptimizer](_salt_optimizer_.saltoptimizer.md)*

*Defined in [salt-optimizer.ts:149](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L149)*

Constuctor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`initialWaterProfile` | [WaterProfile](../interfaces/_water_profile_.waterprofile.md) | initial water profile |
`targetWaterProfile` | [WaterProfile](../interfaces/_water_profile_.waterprofile.md) | target water profile |
`targetResidualAlkalinity` | [AlkalinityValue](_units_.alkalinityvalue.md) | target residual alkalinity |
`strikeVolume` | [VolumeValue](_units_.volumevalue.md) | strike water volume |
`spargeVolume` | [VolumeValue](_units_.volumevalue.md) | sparge water volume |
`salts` | [Salt](../modules/_salts_.md#salt)[] | used salts  |

**Returns:** *[SaltOptimizer](_salt_optimizer_.saltoptimizer.md)*

## Properties

### `Private` initialWaterProfile

• **initialWaterProfile**: *[WaterProfile](../interfaces/_water_profile_.waterprofile.md)*

*Defined in [salt-optimizer.ts:144](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L144)*

___

### `Private` salts

• **salts**: *[Salt](../modules/_salts_.md#salt)[]*

*Defined in [salt-optimizer.ts:147](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L147)*

___

### `Private` spargeVolume

• **spargeVolume**: *[VolumeValue](_units_.volumevalue.md)*

*Defined in [salt-optimizer.ts:149](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L149)*

___

### `Private` strikeVolume

• **strikeVolume**: *[VolumeValue](_units_.volumevalue.md)*

*Defined in [salt-optimizer.ts:148](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L148)*

___

### `Private` targetResidualAlkalinity

• **targetResidualAlkalinity**: *[AlkalinityValue](_units_.alkalinityvalue.md)*

*Defined in [salt-optimizer.ts:146](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L146)*

___

### `Private` targetWaterProfile

• **targetWaterProfile**: *[WaterProfile](../interfaces/_water_profile_.waterprofile.md)*

*Defined in [salt-optimizer.ts:145](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L145)*

## Methods

### `Private` absConstraint

▸ **absConstraint**(`name`: string, `vne`: number): *[Constraint](../interfaces/_salt_optimizer_.constraint.md)*

*Defined in [salt-optimizer.ts:273](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L273)*

Sets up a constaint

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`vne` | number |

**Returns:** *[Constraint](../interfaces/_salt_optimizer_.constraint.md)*

constaint

___

### `Private` absConstraints

▸ **absConstraints**(): *[Constraint](../interfaces/_salt_optimizer_.constraint.md)[]*

*Defined in [salt-optimizer.ts:257](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L257)*

Sets up constaints

**Returns:** *[Constraint](../interfaces/_salt_optimizer_.constraint.md)[]*

list of input constaints

___

### `Private` convertProblemToMatrix

▸ **convertProblemToMatrix**(`problem`: [Problem](../interfaces/_salt_optimizer_.problem.md)): *[MatrixProblem](../interfaces/_salt_optimizer_.matrixproblem.md)*

*Defined in [salt-optimizer.ts:430](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L430)*

Converts problem to matrix problem

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`problem` | [Problem](../interfaces/_salt_optimizer_.problem.md) | problem |

**Returns:** *[MatrixProblem](../interfaces/_salt_optimizer_.matrixproblem.md)*

matrix problem

___

### `Private` convertSolutionToOuput

▸ **convertSolutionToOuput**(`mproblem`: [MatrixProblem](../interfaces/_salt_optimizer_.matrixproblem.md), `solution`: [Solution](../modules/_salt_optimizer_.md#solution)): *[Output](../interfaces/_salt_optimizer_.output.md)*

*Defined in [salt-optimizer.ts:548](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L548)*

Converts solution to JSON format

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`mproblem` | [MatrixProblem](../interfaces/_salt_optimizer_.matrixproblem.md) | matrix problem |
`solution` | [Solution](../modules/_salt_optimizer_.md#solution) | solution |

**Returns:** *[Output](../interfaces/_salt_optimizer_.output.md)*

output

___

### `Private` extractVariables

▸ **extractVariables**(`problem`: [Problem](../interfaces/_salt_optimizer_.problem.md)): *any*

*Defined in [salt-optimizer.ts:507](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L507)*

Extracts variables from problem

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`problem` | [Problem](../interfaces/_salt_optimizer_.problem.md) | problem |

**Returns:** *any*

variables

___

### `Private` getFilledArray

▸ **getFilledArray**(`value`: number, `size`: number): *number[]*

*Defined in [salt-optimizer.ts:479](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L479)*

Returns prefilled array

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | number | initial values |
`size` | number | size of array |

**Returns:** *number[]*

prefilled array

___

### `Private` getFilledMatrix

▸ **getFilledMatrix**(`value`: number, `height`: number, `width`: number): *number[][]*

*Defined in [salt-optimizer.ts:491](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L491)*

Returns prefilled matrix

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | number | initial values |
`height` | number | height |
`width` | number | width |

**Returns:** *number[][]*

prefilled matrix

___

### `Private` getIonSaltMap

▸ **getIonSaltMap**(): *object*

*Defined in [salt-optimizer.ts:323](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L323)*

Returns map of ion salts

**Returns:** *object*

map of ion salts

* \[ **key**: *string*\]: any

___

### `Private` getValue

▸ **getValue**(`mproblem`: [MatrixProblem](../interfaces/_salt_optimizer_.matrixproblem.md), `solution`: [Solution](../modules/_salt_optimizer_.md#solution), `name`: string): *number*

*Defined in [salt-optimizer.ts:578](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L578)*

Returns variable value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`mproblem` | [MatrixProblem](../interfaces/_salt_optimizer_.matrixproblem.md) | matrix problem |
`solution` | [Solution](../modules/_salt_optimizer_.md#solution) | solution |
`name` | string | variable name |

**Returns:** *number*

variable value

___

### `Private` hasSparge

▸ **hasSparge**(): *boolean*

*Defined in [salt-optimizer.ts:248](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L248)*

Returns whether sparge water volume is given or not

**Returns:** *boolean*

whether sparge water volume is given or not

___

### `Private` isAlkalineMineral

▸ **isAlkalineMineral**(`salt`: [Salt](../modules/_salts_.md#salt)): *boolean*

*Defined in [salt-optimizer.ts:420](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L420)*

Returns whether salt is an alkaline mineral

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`salt` | [Salt](../modules/_salts_.md#salt) | salt |

**Returns:** *boolean*

whether salt is an alkaline mineral

___

### `Private` nonNegative

▸ **nonNegative**(`variable`: string): *[Constraint](../interfaces/_salt_optimizer_.constraint.md)*

*Defined in [salt-optimizer.ts:312](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L312)*

Makes non negative constraint

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`variable` | string | variable |

**Returns:** *[Constraint](../interfaces/_salt_optimizer_.constraint.md)*

constraint

___

###  optimizeSalts

▸ **optimizeSalts**(): *[Output](../interfaces/_salt_optimizer_.output.md)*

*Defined in [salt-optimizer.ts:176](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L176)*

Optimizes salts

**Returns:** *[Output](../interfaces/_salt_optimizer_.output.md)*

output

___

### `Private` problemObjective

▸ **problemObjective**(): *[Objective](../interfaces/_salt_optimizer_.objective.md)*

*Defined in [salt-optimizer.ts:216](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L216)*

Sets up problem objective

**Returns:** *[Objective](../interfaces/_salt_optimizer_.objective.md)*

problem objective

___

### `Private` setupIonEConstraints

▸ **setupIonEConstraints**(): *[Constraint](../interfaces/_salt_optimizer_.constraint.md)[]*

*Defined in [salt-optimizer.ts:343](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L343)*

Sets up ion constraint

**Returns:** *[Constraint](../interfaces/_salt_optimizer_.constraint.md)[]*

constaints

___

### `Private` setupLimitConstraints

▸ **setupLimitConstraints**(): *[Constraint](../interfaces/_salt_optimizer_.constraint.md)[]*

*Defined in [salt-optimizer.ts:287](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L287)*

Sets up limit constraints

**Returns:** *[Constraint](../interfaces/_salt_optimizer_.constraint.md)[]*

___

### `Private` setupProblem

▸ **setupProblem**(): *[Problem](../interfaces/_salt_optimizer_.problem.md)*

*Defined in [salt-optimizer.ts:196](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L196)*

Sets up the problem using values from input

**Returns:** *[Problem](../interfaces/_salt_optimizer_.problem.md)*

problem

___

### `Private` setupResidualAlkalinityConstraints

▸ **setupResidualAlkalinityConstraints**(): *object[]*

*Defined in [salt-optimizer.ts:394](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/salt-optimizer.ts#L394)*

Sets up residual alkalinity constraints

**Returns:** *object[]*

constaints
