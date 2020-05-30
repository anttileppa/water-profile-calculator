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

*Defined in [units.ts:48](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L48)*

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

*Defined in [units.ts:115](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L115)*

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

*Defined in [units.ts:134](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L134)*

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

*Defined in [units.ts:215](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L215)*

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

*Defined in [units.ts:87](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L87)*

Returns value's base unit

**Returns:** *U*

value's base unit

___

### `Protected` `Abstract` getConvertRatio

▸ **getConvertRatio**(`unit`: U): *number*

*Defined in [units.ts:191](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L191)*

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

*Defined in [units.ts:77](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L77)*

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

*Defined in [units.ts:96](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L96)*

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

*Defined in [units.ts:66](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L66)*

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

*Defined in [units.ts:125](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L125)*

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

*Defined in [units.ts:148](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L148)*

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

*Defined in [units.ts:202](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L202)*

Converts value to type's base unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | U | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in base units
