[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["units"](../modules/_units_.md) › [PercentValue](_units_.percentvalue.md)

# Class: PercentValue

pH value

## Hierarchy

  ↳ [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md)‹[PercentUnit](../modules/_units_.md#percentunit)›

  ↳ **PercentValue**

## Implements

* [Value](../interfaces/_units_.value.md)‹[PercentUnit](../modules/_units_.md#percentunit)›

## Index

### Constructors

* [constructor](_units_.percentvalue.md#constructor)

### Methods

* [add](_units_.percentvalue.md#add)
* [addValue](_units_.percentvalue.md#addvalue)
* [fromBaseUnit](_units_.percentvalue.md#protected-frombaseunit)
* [getBaseUnit](_units_.percentvalue.md#protected-getbaseunit)
* [getConvertRatio](_units_.percentvalue.md#protected-getconvertratio)
* [getValue](_units_.percentvalue.md#getvalue)
* [roundTo](_units_.percentvalue.md#protected-roundto)
* [setValue](_units_.percentvalue.md#setvalue)
* [sub](_units_.percentvalue.md#sub)
* [subValue](_units_.percentvalue.md#subvalue)
* [toBaseUnit](_units_.percentvalue.md#protected-tobaseunit)

## Constructors

###  constructor

\+ **new PercentValue**(`unit`: [PercentUnit](../modules/_units_.md#percentunit), `value`: number | null): *[PercentValue](_units_.percentvalue.md)*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[constructor](_units_.abstactvalue.md#constructor)*

*Defined in [units.ts:48](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L48)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [PercentUnit](../modules/_units_.md#percentunit) | value unit |
`value` | number &#124; null | value in given unit  |

**Returns:** *[PercentValue](_units_.percentvalue.md)*

## Methods

###  add

▸ **add**(`unit`: [PercentUnit](../modules/_units_.md#percentunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[add](_units_.abstactvalue.md#add)*

*Defined in [units.ts:115](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L115)*

Adds given value to existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [PercentUnit](../modules/_units_.md#percentunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  addValue

▸ **addValue**(`value`: [AbstactValue](_units_.abstactvalue.md)‹[PercentUnit](../modules/_units_.md#percentunit)›): *this*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[addValue](_units_.abstactvalue.md#addvalue)*

*Defined in [units.ts:134](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L134)*

Adds given value to existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹[PercentUnit](../modules/_units_.md#percentunit)› | value  |

**Returns:** *this*

___

### `Protected` fromBaseUnit

▸ **fromBaseUnit**(`unit`: [PercentUnit](../modules/_units_.md#percentunit), `value`: number): *number*

*Inherited from [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[fromBaseUnit](_units_.abstractratiobasedvalue.md#protected-frombaseunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[fromBaseUnit](_units_.abstactvalue.md#protected-abstract-frombaseunit)*

*Defined in [units.ts:215](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L215)*

Converts value from type's base unit into given unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [PercentUnit](../modules/_units_.md#percentunit) | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in given units

___

### `Protected` getBaseUnit

▸ **getBaseUnit**(): *[PercentUnit](../modules/_units_.md#percentunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[getBaseUnit](_units_.abstactvalue.md#protected-abstract-getbaseunit)*

*Defined in [units.ts:637](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L637)*

Returns value's base unit

**Returns:** *[PercentUnit](../modules/_units_.md#percentunit)*

value's base unit

___

### `Protected` getConvertRatio

▸ **getConvertRatio**(`unit`: [PercentUnit](../modules/_units_.md#percentunit)): *number*

*Overrides [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[getConvertRatio](_units_.abstractratiobasedvalue.md#protected-abstract-getconvertratio)*

*Defined in [units.ts:646](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L646)*

Returns convert ratio into base unit

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [PercentUnit](../modules/_units_.md#percentunit) | from unit  |

**Returns:** *number*

___

###  getValue

▸ **getValue**(`unit`: [PercentUnit](../modules/_units_.md#percentunit), `roundTo?`: number): *number | null*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[getValue](_units_.abstactvalue.md#getvalue)*

*Defined in [units.ts:77](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L77)*

Returns a value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [PercentUnit](../modules/_units_.md#percentunit) | value unit |
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

▸ **setValue**(`unit`: [PercentUnit](../modules/_units_.md#percentunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[setValue](_units_.abstactvalue.md#setvalue)*

*Defined in [units.ts:66](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L66)*

Sets a value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [PercentUnit](../modules/_units_.md#percentunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  sub

▸ **sub**(`unit`: [PercentUnit](../modules/_units_.md#percentunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[sub](_units_.abstactvalue.md#sub)*

*Defined in [units.ts:125](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L125)*

Substracts given value from existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [PercentUnit](../modules/_units_.md#percentunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  subValue

▸ **subValue**(`value`: [AbstactValue](_units_.abstactvalue.md)‹[PercentUnit](../modules/_units_.md#percentunit)›): *this*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[subValue](_units_.abstactvalue.md#subvalue)*

*Defined in [units.ts:148](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L148)*

Substracts given value from existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹[PercentUnit](../modules/_units_.md#percentunit)› | value  |

**Returns:** *this*

___

### `Protected` toBaseUnit

▸ **toBaseUnit**(`unit`: [PercentUnit](../modules/_units_.md#percentunit), `value`: number): *number*

*Inherited from [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[toBaseUnit](_units_.abstractratiobasedvalue.md#protected-tobaseunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[toBaseUnit](_units_.abstactvalue.md#protected-abstract-tobaseunit)*

*Defined in [units.ts:202](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L202)*

Converts value to type's base unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [PercentUnit](../modules/_units_.md#percentunit) | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in base units
