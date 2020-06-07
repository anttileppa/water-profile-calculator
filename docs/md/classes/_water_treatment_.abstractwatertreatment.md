[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["water-treatment"](../modules/_water_treatment_.md) › [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md)

# Class: AbstractWaterTreatment

Abstract base class for all water treatment methods

## Hierarchy

* **AbstractWaterTreatment**

  ↳ [BoilingWaterTreatment](_water_treatment_.boilingwatertreatment.md)

  ↳ [LimeWaterTreatment](_water_treatment_.limewatertreatment.md)

## Implements

* [WaterTreatment](../interfaces/_water_treatment_.watertreatment.md)

## Index

### Properties

* [waterCalculator](_water_treatment_.abstractwatertreatment.md#private-watercalculator)

### Methods

* [getAlkalinityChange](_water_treatment_.abstractwatertreatment.md#protected-getalkalinitychange)
* [getCalciumHardness](_water_treatment_.abstractwatertreatment.md#protected-getcalciumhardness)
* [getFinalAlkalinity](_water_treatment_.abstractwatertreatment.md#abstract-getfinalalkalinity)
* [getFinalCaHardness](_water_treatment_.abstractwatertreatment.md#abstract-getfinalcahardness)
* [getFinalMgHardness](_water_treatment_.abstractwatertreatment.md#getfinalmghardness)
* [getMagnesiumHardness](_water_treatment_.abstractwatertreatment.md#protected-getmagnesiumhardness)
* [getPhChange](_water_treatment_.abstractwatertreatment.md#getphchange)
* [getResidualAlkalinity](_water_treatment_.abstractwatertreatment.md#getresidualalkalinity)
* [getResultWaterProfile](_water_treatment_.abstractwatertreatment.md#private-getresultwaterprofile)
* [getStartingAlkalinity](_water_treatment_.abstractwatertreatment.md#protected-getstartingalkalinity)
* [getStartingCalcium](_water_treatment_.abstractwatertreatment.md#protected-getstartingcalcium)
* [getStartingMagnesium](_water_treatment_.abstractwatertreatment.md#protected-getstartingmagnesium)
* [init](_water_treatment_.abstractwatertreatment.md#init)

## Properties

### `Private` waterCalculator

• **waterCalculator**: *[WaterCalculator](_water_calculator_.watercalculator.md)*

*Defined in [water-treatment.ts:33](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L33)*

## Methods

### `Protected` getAlkalinityChange

▸ **getAlkalinityChange**(): *number*

*Defined in [water-treatment.ts:144](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L144)*

Returns alkalinity change

**Returns:** *number*

alkalinity change

___

### `Protected` getCalciumHardness

▸ **getCalciumHardness**(): *number*

*Defined in [water-treatment.ts:126](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L126)*

Returns calcium hardness

**Returns:** *number*

calcium hardness

___

### `Abstract` getFinalAlkalinity

▸ **getFinalAlkalinity**(): *[AlkalinityValue](_units_.alkalinityvalue.md)*

*Defined in [water-treatment.ts:65](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L65)*

Returns final alkalinity in mEq/l

**Returns:** *[AlkalinityValue](_units_.alkalinityvalue.md)*

final alkalinity in mEq/l

___

### `Abstract` getFinalCaHardness

▸ **getFinalCaHardness**(): *number*

*Defined in [water-treatment.ts:49](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L49)*

Returns final calcium hardness in mEq/l

**Returns:** *number*

final calcium hardness in mEq/l

___

###  getFinalMgHardness

▸ **getFinalMgHardness**(): *number*

*Defined in [water-treatment.ts:56](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L56)*

Returns final magnesium hardness in mEq/l

**Returns:** *number*

magnesium hardness in mEq/l

___

### `Protected` getMagnesiumHardness

▸ **getMagnesiumHardness**(): *number*

*Defined in [water-treatment.ts:135](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L135)*

Returns magnesium hardness

**Returns:** *number*

magnesium hardness

___

###  getPhChange

▸ **getPhChange**(): *[PhValue](_units_.phvalue.md)*

*Implementation of [WaterTreatment](../interfaces/_water_treatment_.watertreatment.md)*

*Defined in [water-treatment.ts:84](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L84)*

Returns pH change of treatment. If water is going to be used in sparge, method returns 0

**Returns:** *[PhValue](_units_.phvalue.md)*

pH change of treatment

___

###  getResidualAlkalinity

▸ **getResidualAlkalinity**(): *number*

*Defined in [water-treatment.ts:72](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L72)*

Returns residual alkalinity

**Returns:** *number*

residual alkalinity

___

### `Private` getResultWaterProfile

▸ **getResultWaterProfile**(): *[WaterProfile](../interfaces/_water_profile_.waterprofile.md)*

*Defined in [water-treatment.ts:153](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L153)*

Returns ions after applied salts for treated volume of water

**Returns:** *[WaterProfile](../interfaces/_water_profile_.waterprofile.md)*

ions after applied salts for treated volume of water

___

### `Protected` getStartingAlkalinity

▸ **getStartingAlkalinity**(): *number*

*Defined in [water-treatment.ts:117](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L117)*

Returns starting alkalinity

**Returns:** *number*

starting alkalinity

___

### `Protected` getStartingCalcium

▸ **getStartingCalcium**(): *number*

*Defined in [water-treatment.ts:99](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L99)*

Returns starting calcium

**Returns:** *number*

starting calcium

___

### `Protected` getStartingMagnesium

▸ **getStartingMagnesium**(): *number*

*Defined in [water-treatment.ts:108](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L108)*

Returns starting magnesium

**Returns:** *number*

starting magnesium

___

###  init

▸ **init**(`waterCalculator`: [WaterCalculator](_water_calculator_.watercalculator.md)): *void*

*Implementation of [WaterTreatment](../interfaces/_water_treatment_.watertreatment.md)*

*Defined in [water-treatment.ts:40](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L40)*

Init method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`waterCalculator` | [WaterCalculator](_water_calculator_.watercalculator.md) | water calculator instance  |

**Returns:** *void*
