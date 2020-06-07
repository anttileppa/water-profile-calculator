[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["units"](../modules/_units_.md) › [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md)

# Class: AbstractRatioBasedValue <**U**>

Abstract base class for values that can be converted using simple ratio

## Type parameters

▪ **U**

## Hierarchy

* [AbstactValue](_units_.abstactvalue.md)‹U›

  ↳ **AbstractRatioBasedValue**

  ↳ [VolumeValue](_units_.volumevalue.md)

  ↳ [MassValue](_units_.massvalue.md)

  ↳ [BeerColorValue](_units_.beercolorvalue.md)

  ↳ [BitternessValue](_units_.bitternessvalue.md)

  ↳ [DensityValue](_units_.densityvalue.md)

  ↳ [MassConcentrationValue](_units_.massconcentrationvalue.md)

  ↳ [MassFractionValue](_units_.massfractionvalue.md)

  ↳ [WaterHardnessValue](_units_.waterhardnessvalue.md)

  ↳ [PhValue](_units_.phvalue.md)

  ↳ [PercentValue](_units_.percentvalue.md)

  ↳ [TimeValue](_units_.timevalue.md)

## Implements

* [Value](../interfaces/_units_.value.md)‹U›

## Index

### Constructors

* [constructor](_units_.abstractratiobasedvalue.md#constructor)

### Methods

* [add](_units_.abstractratiobasedvalue.md#add)
* [addValue](_units_.abstractratiobasedvalue.md#addvalue)
* [fromBaseUnit](_units_.abstractratiobasedvalue.md#protected-frombaseunit)
* [getBaseUnit](_units_.abstractratiobasedvalue.md#protected-abstract-getbaseunit)
* [getConvertRatio](_units_.abstractratiobasedvalue.md#protected-abstract-getconvertratio)
* [getValue](_units_.abstractratiobasedvalue.md#getvalue)
* [roundTo](_units_.abstractratiobasedvalue.md#protected-roundto)
* [setValue](_units_.abstractratiobasedvalue.md#setvalue)
* [sub](_units_.abstractratiobasedvalue.md#sub)
* [subValue](_units_.abstractratiobasedvalue.md#subvalue)
* [toBaseUnit](_units_.abstractratiobasedvalue.md#protected-tobaseunit)

## Constructors

###  constructor

\+ **new AbstractRatioBasedValue**(`unit`: U, `value`: number | null): *[AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md)*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[constructor](_units_.abstactvalue.md#constructor)*

*Defined in [units.ts:49](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L49)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | U | value unit |
`value` | number &#124; null | value in given unit  |

**Returns:** *[AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md)*

## Methods

###  add

▸ **add**(`unit`: U, `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[add](_units_.abstactvalue.md#add)*

*Defined in [units.ts:116](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L116)*

Adds given value to existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | U | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  addValue

▸ **addValue**(`value`: [AbstactValue](_units_.abstactvalue.md)‹U›): *this*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[addValue](_units_.abstactvalue.md#addvalue)*

*Defined in [units.ts:135](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L135)*

Adds given value to existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹U› | value  |

**Returns:** *this*

___

### `Protected` fromBaseUnit

▸ **fromBaseUnit**(`unit`: U, `value`: number): *number*

*Overrides [AbstactValue](_units_.abstactvalue.md).[fromBaseUnit](_units_.abstactvalue.md#protected-abstract-frombaseunit)*

*Defined in [units.ts:216](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L216)*

Converts value from type's base unit into given unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | U | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in given units

___

### `Protected` `Abstract` getBaseUnit

▸ **getBaseUnit**(): *U*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[getBaseUnit](_units_.abstactvalue.md#protected-abstract-getbaseunit)*

*Defined in [units.ts:88](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L88)*

Returns value's base unit

**Returns:** *U*

value's base unit

___

### `Protected` `Abstract` getConvertRatio

▸ **getConvertRatio**(`unit`: U): *number*

*Defined in [units.ts:192](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L192)*

Returns convert ratio into base unit

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | U | from unit  |

**Returns:** *number*

___

###  getValue

▸ **getValue**(`unit`: U, `roundTo?`: number): *number | null*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[getValue](_units_.abstactvalue.md#getvalue)*

*Defined in [units.ts:78](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L78)*

Returns a value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | U | value unit |
`roundTo?` | number | rounds to given digits. Returns exact value if not specified |

**Returns:** *number | null*

value in given unit

___

### `Protected` roundTo

▸ **roundTo**(`value`: number | null, `digits?`: number): *number*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[roundTo](_units_.abstactvalue.md#protected-roundto)*

*Defined in [units.ts:97](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L97)*

Rounds value to given digits. Returns exact value if digits not specified

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | number &#124; null | value |
`digits?` | number | digits |

**Returns:** *number*

rounded value

___

###  setValue

▸ **setValue**(`unit`: U, `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[setValue](_units_.abstactvalue.md#setvalue)*

*Defined in [units.ts:67](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L67)*

Sets a value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | U | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  sub

▸ **sub**(`unit`: U, `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[sub](_units_.abstactvalue.md#sub)*

*Defined in [units.ts:126](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L126)*

Substracts given value from existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | U | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  subValue

▸ **subValue**(`value`: [AbstactValue](_units_.abstactvalue.md)‹U›): *this*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[subValue](_units_.abstactvalue.md#subvalue)*

*Defined in [units.ts:149](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L149)*

Substracts given value from existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹U› | value  |

**Returns:** *this*

___

### `Protected` toBaseUnit

▸ **toBaseUnit**(`unit`: U, `value`: number): *number*

*Overrides [AbstactValue](_units_.abstactvalue.md).[toBaseUnit](_units_.abstactvalue.md#protected-abstract-tobaseunit)*

*Defined in [units.ts:203](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L203)*

Converts value to type's base unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | U | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in base units
