[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["water-treatment"](../modules/_water_treatment_.md) › [WaterTreatment](_water_treatment_.watertreatment.md)

# Interface: WaterTreatment

Interface describing a water treatment method

## Hierarchy

* **WaterTreatment**

## Implemented by

* [AbstractWaterTreatment](../classes/_water_treatment_.abstractwatertreatment.md)
* [BoilingWaterTreatment](../classes/_water_treatment_.boilingwatertreatment.md)
* [LimeWaterTreatment](../classes/_water_treatment_.limewatertreatment.md)

## Index

### Methods

* [getPhChange](_water_treatment_.watertreatment.md#getphchange)
* [init](_water_treatment_.watertreatment.md#init)

## Methods

###  getPhChange

▸ **getPhChange**(): *[PhValue](../classes/_units_.phvalue.md)*

*Defined in [water-treatment.ts:24](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L24)*

Returns pH change of treatment

**Returns:** *[PhValue](../classes/_units_.phvalue.md)*

pH change of treatment

___

###  init

▸ **init**(`waterCalculator`: [WaterCalculator](../classes/_water_calculator_.watercalculator.md)): *void*

*Defined in [water-treatment.ts:17](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L17)*

Init method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`waterCalculator` | [WaterCalculator](../classes/_water_calculator_.watercalculator.md) | water calculator instance  |

**Returns:** *void*
