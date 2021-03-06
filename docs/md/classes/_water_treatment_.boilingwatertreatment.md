[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["water-treatment"](../modules/_water_treatment_.md) › [BoilingWaterTreatment](_water_treatment_.boilingwatertreatment.md)

# Class: BoilingWaterTreatment

Water treatment implementation using boiling to precipitate alkalinity.

## Hierarchy

* [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md)

  ↳ **BoilingWaterTreatment**

## Implements

* [WaterTreatment](../interfaces/_water_treatment_.watertreatment.md)

## Index

### Constructors

* [constructor](_water_treatment_.boilingwatertreatment.md#constructor)

### Properties

* [postBoilKh](_water_treatment_.boilingwatertreatment.md#private-optional-postboilkh)

### Methods

* [getAlkalinityChange](_water_treatment_.boilingwatertreatment.md#protected-getalkalinitychange)
* [getCalciumHardness](_water_treatment_.boilingwatertreatment.md#protected-getcalciumhardness)
* [getEstimatedPostBoilAlkalinity](_water_treatment_.boilingwatertreatment.md#private-getestimatedpostboilalkalinity)
* [getFinalAlkalinity](_water_treatment_.boilingwatertreatment.md#getfinalalkalinity)
* [getFinalCaHardness](_water_treatment_.boilingwatertreatment.md#getfinalcahardness)
* [getFinalMgHardness](_water_treatment_.boilingwatertreatment.md#getfinalmghardness)
* [getMagnesiumHardness](_water_treatment_.boilingwatertreatment.md#protected-getmagnesiumhardness)
* [getPhChange](_water_treatment_.boilingwatertreatment.md#getphchange)
* [getResidualAlkalinity](_water_treatment_.boilingwatertreatment.md#getresidualalkalinity)
* [getStartingAlkalinity](_water_treatment_.boilingwatertreatment.md#protected-getstartingalkalinity)
* [getStartingCalcium](_water_treatment_.boilingwatertreatment.md#protected-getstartingcalcium)
* [getStartingMagnesium](_water_treatment_.boilingwatertreatment.md#protected-getstartingmagnesium)
* [init](_water_treatment_.boilingwatertreatment.md#init)

## Constructors

###  constructor

\+ **new BoilingWaterTreatment**(`postBoilKh?`: [WaterHardnessValue](_units_.waterhardnessvalue.md)): *[BoilingWaterTreatment](_water_treatment_.boilingwatertreatment.md)*

*Defined in [water-treatment.ts:164](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L164)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`postBoilKh?` | [WaterHardnessValue](_units_.waterhardnessvalue.md) | measured post boil KH (optional)  |

**Returns:** *[BoilingWaterTreatment](_water_treatment_.boilingwatertreatment.md)*

## Properties

### `Private` `Optional` postBoilKh

• **postBoilKh**? : *[WaterHardnessValue](_units_.waterhardnessvalue.md)*

*Defined in [water-treatment.ts:164](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L164)*

## Methods

### `Protected` getAlkalinityChange

▸ **getAlkalinityChange**(): *number*

*Inherited from [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[getAlkalinityChange](_water_treatment_.abstractwatertreatment.md#protected-getalkalinitychange)*

*Defined in [water-treatment.ts:144](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L144)*

Returns alkalinity change

**Returns:** *number*

alkalinity change

___

### `Protected` getCalciumHardness

▸ **getCalciumHardness**(): *number*

*Inherited from [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[getCalciumHardness](_water_treatment_.abstractwatertreatment.md#protected-getcalciumhardness)*

*Defined in [water-treatment.ts:126](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L126)*

Returns calcium hardness

**Returns:** *number*

calcium hardness

___

### `Private` getEstimatedPostBoilAlkalinity

▸ **getEstimatedPostBoilAlkalinity**(): *number*

*Defined in [water-treatment.ts:205](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L205)*

Returns estimated post boil alkalinity in mEq/l

**Returns:** *number*

estimated post boil alkalinity in mEq/l

___

###  getFinalAlkalinity

▸ **getFinalAlkalinity**(): *[AlkalinityValue](_units_.alkalinityvalue.md) | null*

*Overrides [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[getFinalAlkalinity](_water_treatment_.abstractwatertreatment.md#abstract-getfinalalkalinity)*

*Defined in [water-treatment.ts:196](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L196)*

Returns final alkalinity in mEq/l

**Returns:** *[AlkalinityValue](_units_.alkalinityvalue.md) | null*

final alkalinity in mEq/l

___

###  getFinalCaHardness

▸ **getFinalCaHardness**(): *number*

*Overrides [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[getFinalCaHardness](_water_treatment_.abstractwatertreatment.md#abstract-getfinalcahardness)*

*Defined in [water-treatment.ts:181](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L181)*

Returns final calcium hardness in mEq/l

**Returns:** *number*

final calcium hardness in mEq/l

___

###  getFinalMgHardness

▸ **getFinalMgHardness**(): *number*

*Inherited from [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[getFinalMgHardness](_water_treatment_.abstractwatertreatment.md#getfinalmghardness)*

*Defined in [water-treatment.ts:56](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L56)*

Returns final magnesium hardness in mEq/l

**Returns:** *number*

magnesium hardness in mEq/l

___

### `Protected` getMagnesiumHardness

▸ **getMagnesiumHardness**(): *number*

*Inherited from [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[getMagnesiumHardness](_water_treatment_.abstractwatertreatment.md#protected-getmagnesiumhardness)*

*Defined in [water-treatment.ts:135](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L135)*

Returns magnesium hardness

**Returns:** *number*

magnesium hardness

___

###  getPhChange

▸ **getPhChange**(): *[PhValue](_units_.phvalue.md)*

*Implementation of [WaterTreatment](../interfaces/_water_treatment_.watertreatment.md)*

*Inherited from [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[getPhChange](_water_treatment_.abstractwatertreatment.md#getphchange)*

*Defined in [water-treatment.ts:84](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L84)*

Returns pH change of treatment. If water is going to be used in sparge, method returns 0

**Returns:** *[PhValue](_units_.phvalue.md)*

pH change of treatment

___

###  getResidualAlkalinity

▸ **getResidualAlkalinity**(): *number*

*Inherited from [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[getResidualAlkalinity](_water_treatment_.abstractwatertreatment.md#getresidualalkalinity)*

*Defined in [water-treatment.ts:72](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L72)*

Returns residual alkalinity

**Returns:** *number*

residual alkalinity

___

### `Protected` getStartingAlkalinity

▸ **getStartingAlkalinity**(): *number*

*Inherited from [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[getStartingAlkalinity](_water_treatment_.abstractwatertreatment.md#protected-getstartingalkalinity)*

*Defined in [water-treatment.ts:117](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L117)*

Returns starting alkalinity

**Returns:** *number*

starting alkalinity

___

### `Protected` getStartingCalcium

▸ **getStartingCalcium**(): *number*

*Inherited from [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[getStartingCalcium](_water_treatment_.abstractwatertreatment.md#protected-getstartingcalcium)*

*Defined in [water-treatment.ts:99](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L99)*

Returns starting calcium

**Returns:** *number*

starting calcium

___

### `Protected` getStartingMagnesium

▸ **getStartingMagnesium**(): *number*

*Inherited from [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[getStartingMagnesium](_water_treatment_.abstractwatertreatment.md#protected-getstartingmagnesium)*

*Defined in [water-treatment.ts:108](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L108)*

Returns starting magnesium

**Returns:** *number*

starting magnesium

___

###  init

▸ **init**(`waterCalculator`: [WaterCalculator](_water_calculator_.watercalculator.md)): *void*

*Implementation of [WaterTreatment](../interfaces/_water_treatment_.watertreatment.md)*

*Inherited from [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[init](_water_treatment_.abstractwatertreatment.md#init)*

*Defined in [water-treatment.ts:40](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L40)*

Init method

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`waterCalculator` | [WaterCalculator](_water_calculator_.watercalculator.md) | water calculator instance  |

**Returns:** *void*
