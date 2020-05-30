[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["units"](../modules/_units_.md) › [Value](_units_.value.md)

# Interface: Value <**U**>

Interface for a value

## Type parameters

▪ **U**

## Hierarchy

* **Value**

## Implemented by

* [AbstactValue](../classes/_units_.abstactvalue.md)
* [AbstractRatioBasedValue](../classes/_units_.abstractratiobasedvalue.md)
* [AlkalinityValue](../classes/_units_.alkalinityvalue.md)
* [BeerColorValue](../classes/_units_.beercolorvalue.md)
* [BicarbonateValue](../classes/_units_.bicarbonatevalue.md)
* [CalciumValue](../classes/_units_.calciumvalue.md)
* [ChlorideValue](../classes/_units_.chloridevalue.md)
* [DensityValue](../classes/_units_.densityvalue.md)
* [MagnesiumValue](../classes/_units_.magnesiumvalue.md)
* [MassConcentrationValue](../classes/_units_.massconcentrationvalue.md)
* [MassFractionValue](../classes/_units_.massfractionvalue.md)
* [MassValue](../classes/_units_.massvalue.md)
* [PercentValue](../classes/_units_.percentvalue.md)
* [PhValue](../classes/_units_.phvalue.md)
* [SodiumValue](../classes/_units_.sodiumvalue.md)
* [SulfateValue](../classes/_units_.sulfatevalue.md)
* [TimeValue](../classes/_units_.timevalue.md)
* [VolumeValue](../classes/_units_.volumevalue.md)
* [WaterHardnessValue](../classes/_units_.waterhardnessvalue.md)

## Index

### Properties

* [add](_units_.value.md#add)
* [getValue](_units_.value.md#getvalue)
* [setValue](_units_.value.md#setvalue)

## Properties

###  add

• **add**: *function*

*Defined in [units.ts:39](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L39)*

Adds given value to existing value

**`param`** value unit

**`param`** numeric value in given unit

#### Type declaration:

▸ (`unit`: U, `value`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`unit` | U |
`value` | number |

___

###  getValue

• **getValue**: *function*

*Defined in [units.ts:31](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L31)*

Returns a value

**`param`** value unit

**`returns`** value in given unit

#### Type declaration:

▸ (`unit`: U): *number | null*

**Parameters:**

Name | Type |
------ | ------ |
`unit` | U |

___

###  setValue

• **setValue**: *function*

*Defined in [units.ts:23](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L23)*

Sets a value

**`param`** value unit

**`param`** numeric value in given unit

#### Type declaration:

▸ (`unit`: U, `value`: number | null): *void*

**Parameters:**

Name | Type |
------ | ------ |
`unit` | U |
`value` | number &#124; null |
