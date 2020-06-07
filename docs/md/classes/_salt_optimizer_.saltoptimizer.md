[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["salt-optimizer"](../modules/_salt_optimizer_.md) › [SaltOptimizer](_salt_optimizer_.saltoptimizer.md)

# Class: SaltOptimizer

Automatically determine salt additions for brewing water.

## Hierarchy

* **SaltOptimizer**

## Index

### Constructors

* [constructor](_salt_optimizer_.saltoptimizer.md#constructor)

### Properties

* [salts](_salt_optimizer_.saltoptimizer.md#private-salts)
* [targetWaterProfile](_salt_optimizer_.saltoptimizer.md#private-targetwaterprofile)
* [waterCalculator](_salt_optimizer_.saltoptimizer.md#private-watercalculator)

### Methods

* [getMassConcentrationValue](_salt_optimizer_.saltoptimizer.md#private-getmassconcentrationvalue)
* [getResultVerticeSaltConcentrations](_salt_optimizer_.saltoptimizer.md#private-getresultverticesaltconcentrations)
* [getWaterProfileTotalError](_salt_optimizer_.saltoptimizer.md#private-getwaterprofiletotalerror)
* [optimizeSalts](_salt_optimizer_.saltoptimizer.md#optimizesalts)

## Constructors

###  constructor

\+ **new SaltOptimizer**(`waterCalculator`: [WaterCalculator](_water_calculator_.watercalculator.md), `targetWaterProfile`: [WaterProfile](../interfaces/_water_profile_.waterprofile.md), `salts`: [Salt](../modules/_salts_.md#salt)[]): *[SaltOptimizer](_salt_optimizer_.saltoptimizer.md)*

*Defined in [salt-optimizer.ts:38](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/salt-optimizer.ts#L38)*

Constuctor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`waterCalculator` | [WaterCalculator](_water_calculator_.watercalculator.md) | water calculator |
`targetWaterProfile` | [WaterProfile](../interfaces/_water_profile_.waterprofile.md) | target water profile |
`salts` | [Salt](../modules/_salts_.md#salt)[] | used salts  |

**Returns:** *[SaltOptimizer](_salt_optimizer_.saltoptimizer.md)*

## Properties

### `Private` salts

• **salts**: *[Salt](../modules/_salts_.md#salt)[]*

*Defined in [salt-optimizer.ts:38](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/salt-optimizer.ts#L38)*

___

### `Private` targetWaterProfile

• **targetWaterProfile**: *[WaterProfile](../interfaces/_water_profile_.waterprofile.md)*

*Defined in [salt-optimizer.ts:37](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/salt-optimizer.ts#L37)*

___

### `Private` waterCalculator

• **waterCalculator**: *[WaterCalculator](_water_calculator_.watercalculator.md)*

*Defined in [salt-optimizer.ts:36](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/salt-optimizer.ts#L36)*

## Methods

### `Private` getMassConcentrationValue

▸ **getMassConcentrationValue**(`value?`: number): *[MassConcentrationValue](_units_.massconcentrationvalue.md)‹›*

*Defined in [salt-optimizer.ts:147](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/salt-optimizer.ts#L147)*

Returns numeric mg/l value as MassConcentrationValue

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value?` | number | numeric mg/l value |

**Returns:** *[MassConcentrationValue](_units_.massconcentrationvalue.md)‹›*

MassConcentrationValue

___

### `Private` getResultVerticeSaltConcentrations

▸ **getResultVerticeSaltConcentrations**(`vertice`: [ResultVertice](../interfaces/_salt_optimizer_.resultvertice.md)): *object*

*Defined in [salt-optimizer.ts:113](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/salt-optimizer.ts#L113)*

Convert LPSolver vertice into salt concentrations

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`vertice` | [ResultVertice](../interfaces/_salt_optimizer_.resultvertice.md) | LPSolver vertice |

**Returns:** *object*

salt concentrations

* **bakingSoda**: *[MassConcentrationValue](_units_.massconcentrationvalue.md)‹›* = this.getMassConcentrationValue(bakingSoda)

* **calciumChloride**: *[MassConcentrationValue](_units_.massconcentrationvalue.md)‹›* = this.getMassConcentrationValue(calciumChloride)

* **chalkDissolved**: *[MassConcentrationValue](_units_.massconcentrationvalue.md)‹›* = this.getMassConcentrationValue(chalkDissolved)

* **epsom**: *[MassConcentrationValue](_units_.massconcentrationvalue.md)‹›* = this.getMassConcentrationValue(epsom)

* **gypsum**: *[MassConcentrationValue](_units_.massconcentrationvalue.md)‹›* = this.getMassConcentrationValue(gypsum)

* **magnesiumChloride**: *[MassConcentrationValue](_units_.massconcentrationvalue.md)‹›* = this.getMassConcentrationValue(magnesiumChloride)

* **tableSalt**: *[MassConcentrationValue](_units_.massconcentrationvalue.md)‹›* = this.getMassConcentrationValue(tableSalt)

___

### `Private` getWaterProfileTotalError

▸ **getWaterProfileTotalError**(`saltConcentrations`: [SaltConcentrations](../interfaces/_salts_.saltconcentrations.md)): *number*

*Defined in [salt-optimizer.ts:133](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/salt-optimizer.ts#L133)*

Calculates water profile total errors if given salts were used

**`returnss`** water profile total errors if given salts were used

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`saltConcentrations` | [SaltConcentrations](../interfaces/_salts_.saltconcentrations.md) | salt concentrations |

**Returns:** *number*

___

###  optimizeSalts

▸ **optimizeSalts**(): *[SaltConcentrations](../interfaces/_salts_.saltconcentrations.md)*

*Defined in [salt-optimizer.ts:58](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/salt-optimizer.ts#L58)*

Optimizes salts

**Returns:** *[SaltConcentrations](../interfaces/_salts_.saltconcentrations.md)*

optimized salt concentrations
