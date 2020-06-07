[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["water-treatment"](../modules/_water_treatment_.md) › [LimeWaterTreatment](_water_treatment_.limewatertreatment.md)

# Class: LimeWaterTreatment

Water treatment implementation using lime to precipitate alkalinity.

## Hierarchy

* [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md)

  ↳ **LimeWaterTreatment**

## Implements

* [WaterTreatment](../interfaces/_water_treatment_.watertreatment.md)

## Index

### Constructors

* [constructor](_water_treatment_.limewatertreatment.md#constructor)

### Properties

* [postTreatmentGh](_water_treatment_.limewatertreatment.md#private-optional-posttreatmentgh)
* [postTreatmentKh](_water_treatment_.limewatertreatment.md#private-optional-posttreatmentkh)

### Methods

* [getAlkalinityChange](_water_treatment_.limewatertreatment.md#protected-getalkalinitychange)
* [getCalciumHardness](_water_treatment_.limewatertreatment.md#protected-getcalciumhardness)
* [getFinalAlkalinity](_water_treatment_.limewatertreatment.md#getfinalalkalinity)
* [getFinalCaHardness](_water_treatment_.limewatertreatment.md#getfinalcahardness)
* [getFinalMgHardness](_water_treatment_.limewatertreatment.md#getfinalmghardness)
* [getLimeConcentrationForLimeTreatment](_water_treatment_.limewatertreatment.md#getlimeconcentrationforlimetreatment)
* [getLimeNeededForLimeTreatment](_water_treatment_.limewatertreatment.md#getlimeneededforlimetreatment)
* [getMagnesiumHardness](_water_treatment_.limewatertreatment.md#protected-getmagnesiumhardness)
* [getPhChange](_water_treatment_.limewatertreatment.md#getphchange)
* [getResidualAlkalinity](_water_treatment_.limewatertreatment.md#getresidualalkalinity)
* [getStartingAlkalinity](_water_treatment_.limewatertreatment.md#protected-getstartingalkalinity)
* [getStartingCalcium](_water_treatment_.limewatertreatment.md#protected-getstartingcalcium)
* [getStartingMagnesium](_water_treatment_.limewatertreatment.md#protected-getstartingmagnesium)
* [init](_water_treatment_.limewatertreatment.md#init)

## Constructors

###  constructor

\+ **new LimeWaterTreatment**(`postTreatmentGh?`: [WaterHardnessValue](_units_.waterhardnessvalue.md), `postTreatmentKh?`: [WaterHardnessValue](_units_.waterhardnessvalue.md)): *[LimeWaterTreatment](_water_treatment_.limewatertreatment.md)*

*Defined in [water-treatment.ts:226](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L226)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`postTreatmentGh?` | [WaterHardnessValue](_units_.waterhardnessvalue.md) | measured post treatment GH (optional) |
`postTreatmentKh?` | [WaterHardnessValue](_units_.waterhardnessvalue.md) | measured post treatment KH (optional)  |

**Returns:** *[LimeWaterTreatment](_water_treatment_.limewatertreatment.md)*

## Properties

### `Private` `Optional` postTreatmentGh

• **postTreatmentGh**? : *[WaterHardnessValue](_units_.waterhardnessvalue.md)*

*Defined in [water-treatment.ts:225](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L225)*

___

### `Private` `Optional` postTreatmentKh

• **postTreatmentKh**? : *[WaterHardnessValue](_units_.waterhardnessvalue.md)*

*Defined in [water-treatment.ts:226](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L226)*

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

###  getFinalAlkalinity

▸ **getFinalAlkalinity**(): *[AlkalinityValue](_units_.alkalinityvalue.md) | null*

*Overrides [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[getFinalAlkalinity](_water_treatment_.abstractwatertreatment.md#abstract-getfinalalkalinity)*

*Defined in [water-treatment.ts:256](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L256)*

Returns final alkalinity in mEq/l

**Returns:** *[AlkalinityValue](_units_.alkalinityvalue.md) | null*

final alkalinity in mEq/l

___

###  getFinalCaHardness

▸ **getFinalCaHardness**(): *number*

*Overrides [AbstractWaterTreatment](_water_treatment_.abstractwatertreatment.md).[getFinalCaHardness](_water_treatment_.abstractwatertreatment.md#abstract-getfinalcahardness)*

*Defined in [water-treatment.ts:245](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L245)*

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

###  getLimeConcentrationForLimeTreatment

▸ **getLimeConcentrationForLimeTreatment**(`phBeforeTreatment`: [PhValue](_units_.phvalue.md)): *[MassConcentrationValue](_units_.massconcentrationvalue.md)*

*Defined in [water-treatment.ts:279](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L279)*

Returns required concentration of calcium oxide or "lime" to treat the water

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`phBeforeTreatment` | [PhValue](_units_.phvalue.md) | pH before treatment |

**Returns:** *[MassConcentrationValue](_units_.massconcentrationvalue.md)*

required concentration of calcium oxide or "lime" to treat the water

___

###  getLimeNeededForLimeTreatment

▸ **getLimeNeededForLimeTreatment**(`waterVolume`: [VolumeValue](_units_.volumevalue.md), `phBeforeTreatment`: [PhValue](_units_.phvalue.md)): *[MassValue](_units_.massvalue.md)*

*Defined in [water-treatment.ts:268](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/water-treatment.ts#L268)*

Returns required amount of calcium oxide or "lime" to treat the water

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`waterVolume` | [VolumeValue](_units_.volumevalue.md) | volume of water to treat |
`phBeforeTreatment` | [PhValue](_units_.phvalue.md) | pH before treatment |

**Returns:** *[MassValue](_units_.massvalue.md)*

required concentration of calcium oxide or "lime" to treat the water

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
