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
* [getIonsAfterSalts](_water_treatment_.abstractwatertreatment.md#private-getionsaftersalts)
* [getMagnesiumHardness](_water_treatment_.abstractwatertreatment.md#protected-getmagnesiumhardness)
* [getPhChange](_water_treatment_.abstractwatertreatment.md#getphchange)
* [getResidualAlkalinity](_water_treatment_.abstractwatertreatment.md#getresidualalkalinity)
* [getStartingAlkalinity](_water_treatment_.abstractwatertreatment.md#protected-getstartingalkalinity)
* [getStartingCalcium](_water_treatment_.abstractwatertreatment.md#protected-getstartingcalcium)
* [getStartingMagnesium](_water_treatment_.abstractwatertreatment.md#protected-getstartingmagnesium)
* [getTreatedWater](_water_treatment_.abstractwatertreatment.md#private-gettreatedwater)
* [init](_water_treatment_.abstractwatertreatment.md#init)

## Properties

### `Private` waterCalculator

• **waterCalculator**: *[WaterCalculator](_water_calculator_.watercalculator.md)*

*Defined in [water-treatment.ts:33](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L33)*

## Methods

### `Protected` getAlkalinityChange

▸ **getAlkalinityChange**(): *number*

*Defined in [water-treatment.ts:140](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L140)*

Returns alkalinity change

**Returns:** *number*

alkalinity change

___

### `Protected` getCalciumHardness

▸ **getCalciumHardness**(): *number*

*Defined in [water-treatment.ts:122](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L122)*

Returns calcium hardness

**Returns:** *number*

calcium hardness

___

### `Abstract` getFinalAlkalinity

▸ **getFinalAlkalinity**(): *[AlkalinityValue](_units_.alkalinityvalue.md)*

*Defined in [water-treatment.ts:65](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L65)*

Returns final alkalinity in mEq/l

**Returns:** *[AlkalinityValue](_units_.alkalinityvalue.md)*

final alkalinity in mEq/l

___

### `Abstract` getFinalCaHardness

▸ **getFinalCaHardness**(): *number*

*Defined in [water-treatment.ts:49](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L49)*

Returns final calcium hardness in mEq/l

**Returns:** *number*

final calcium hardness in mEq/l

___

###  getFinalMgHardness

▸ **getFinalMgHardness**(): *number*

*Defined in [water-treatment.ts:56](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L56)*

Returns final magnesium hardness in mEq/l

**Returns:** *number*

magnesium hardness in mEq/l

___

### `Private` getIonsAfterSalts

▸ **getIonsAfterSalts**(): *[WaterProfile](../interfaces/_water_profile_.waterprofile.md)*

*Defined in [water-treatment.ts:158](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L158)*

Returns ions after applied salts for treated volume of water

**Returns:** *[WaterProfile](../interfaces/_water_profile_.waterprofile.md)*

ions after applied salts for treated volume of water

___

### `Protected` getMagnesiumHardness

▸ **getMagnesiumHardness**(): *number*

*Defined in [water-treatment.ts:131](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L131)*

Returns magnesium hardness

**Returns:** *number*

magnesium hardness

___

###  getPhChange

▸ **getPhChange**(): *[PhValue](_units_.phvalue.md)*

*Implementation of [WaterTreatment](../interfaces/_water_treatment_.watertreatment.md)*

*Defined in [water-treatment.ts:84](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L84)*

Returns pH change of treatment

**Returns:** *[PhValue](_units_.phvalue.md)*

pH change of treatment

___

###  getResidualAlkalinity

▸ **getResidualAlkalinity**(): *number*

*Defined in [water-treatment.ts:72](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L72)*

Returns residual alkalinity

**Returns:** *number*

residual alkalinity

___

### `Protected` getStartingAlkalinity

▸ **getStartingAlkalinity**(): *number*

*Defined in [water-treatment.ts:113](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L113)*

Returns starting alkalinity

**Returns:** *number*

starting alkalinity

___

### `Protected` getStartingCalcium

▸ **getStartingCalcium**(): *number*

*Defined in [water-treatment.ts:95](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L95)*

Returns starting calcium

**Returns:** *number*

starting calcium

___

### `Protected` getStartingMagnesium

▸ **getStartingMagnesium**(): *number*

*Defined in [water-treatment.ts:104](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L104)*

Returns starting magnesium

**Returns:** *number*

starting magnesium

___

### `Private` getTreatedWater

▸ **getTreatedWater**(): *[VolumeValue](_units_.volumevalue.md)‹›*

*Defined in [water-treatment.ts:149](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L149)*

Returns volume of treated water

**Returns:** *[VolumeValue](_units_.volumevalue.md)‹›*

volume of treated water

___

###  init

▸ **init**(`waterCalculator`: [WaterCalculator](_water_calculator_.watercalculator.md)): *void*

*Implementation of [WaterTreatment](../interfaces/_water_treatment_.watertreatment.md)*

*Defined in [water-treatment.ts:40](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/water-treatment.ts#L40)*

Init method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`waterCalculator` | [WaterCalculator](_water_calculator_.watercalculator.md) | water calculator instance  |

**Returns:** *void*
