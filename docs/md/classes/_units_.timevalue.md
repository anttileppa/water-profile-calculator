[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["units"](../modules/_units_.md) › [TimeValue](_units_.timevalue.md)

# Class: TimeValue

Time value

## Hierarchy

  ↳ [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md)‹[TimeUnit](../modules/_units_.md#timeunit)›

  ↳ **TimeValue**

## Implements

* [Value](../interfaces/_units_.value.md)‹[TimeUnit](../modules/_units_.md#timeunit)›

## Index

### Constructors

* [constructor](_units_.timevalue.md#constructor)

### Methods

* [add](_units_.timevalue.md#add)
* [addValue](_units_.timevalue.md#addvalue)
* [fromBaseUnit](_units_.timevalue.md#protected-frombaseunit)
* [getBaseUnit](_units_.timevalue.md#protected-getbaseunit)
* [getConvertRatio](_units_.timevalue.md#protected-getconvertratio)
* [getValue](_units_.timevalue.md#getvalue)
* [roundTo](_units_.timevalue.md#protected-roundto)
* [setValue](_units_.timevalue.md#setvalue)
* [sub](_units_.timevalue.md#sub)
* [subValue](_units_.timevalue.md#subvalue)
* [toBaseUnit](_units_.timevalue.md#protected-tobaseunit)

## Constructors

###  constructor

\+ **new TimeValue**(`unit`: [TimeUnit](../modules/_units_.md#timeunit), `value`: number | null): *[TimeValue](_units_.timevalue.md)*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[constructor](_units_.abstactvalue.md#constructor)*

*Defined in [units.ts:48](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L48)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [TimeUnit](../modules/_units_.md#timeunit) | value unit |
`value` | number &#124; null | value in given unit  |

**Returns:** *[TimeValue](_units_.timevalue.md)*

## Methods

###  add

▸ **add**(`unit`: [TimeUnit](../modules/_units_.md#timeunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[add](_units_.abstactvalue.md#add)*

*Defined in [units.ts:115](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L115)*

Adds given value to existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [TimeUnit](../modules/_units_.md#timeunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  addValue

▸ **addValue**(`value`: [AbstactValue](_units_.abstactvalue.md)‹[TimeUnit](../modules/_units_.md#timeunit)›): *this*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[addValue](_units_.abstactvalue.md#addvalue)*

*Defined in [units.ts:134](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L134)*

Adds given value to existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹[TimeUnit](../modules/_units_.md#timeunit)› | value  |

**Returns:** *this*

___

### `Protected` fromBaseUnit

▸ **fromBaseUnit**(`unit`: [TimeUnit](../modules/_units_.md#timeunit), `value`: number): *number*

*Inherited from [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[fromBaseUnit](_units_.abstractratiobasedvalue.md#protected-frombaseunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[fromBaseUnit](_units_.abstactvalue.md#protected-abstract-frombaseunit)*

*Defined in [units.ts:215](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L215)*

Converts value from type's base unit into given unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [TimeUnit](../modules/_units_.md#timeunit) | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in given units

___

### `Protected` getBaseUnit

▸ **getBaseUnit**(): *[TimeUnit](../modules/_units_.md#timeunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[getBaseUnit](_units_.abstactvalue.md#protected-abstract-getbaseunit)*

*Defined in [units.ts:662](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L662)*

Returns value's base unit

**Returns:** *[TimeUnit](../modules/_units_.md#timeunit)*

value's base unit

___

### `Protected` getConvertRatio

▸ **getConvertRatio**(`unit`: [TimeUnit](../modules/_units_.md#timeunit)): *number*

*Overrides [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[getConvertRatio](_units_.abstractratiobasedvalue.md#protected-abstract-getconvertratio)*

*Defined in [units.ts:671](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L671)*

Returns convert ratio into base unit

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [TimeUnit](../modules/_units_.md#timeunit) | from unit  |

**Returns:** *number*

___

###  getValue

▸ **getValue**(`unit`: [TimeUnit](../modules/_units_.md#timeunit), `roundTo?`: number): *number | null*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[getValue](_units_.abstactvalue.md#getvalue)*

*Defined in [units.ts:77](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L77)*

Returns a value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [TimeUnit](../modules/_units_.md#timeunit) | value unit |
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

▸ **setValue**(`unit`: [TimeUnit](../modules/_units_.md#timeunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[setValue](_units_.abstactvalue.md#setvalue)*

*Defined in [units.ts:66](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L66)*

Sets a value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [TimeUnit](../modules/_units_.md#timeunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  sub

▸ **sub**(`unit`: [TimeUnit](../modules/_units_.md#timeunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[sub](_units_.abstactvalue.md#sub)*

*Defined in [units.ts:125](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L125)*

Substracts given value from existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [TimeUnit](../modules/_units_.md#timeunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  subValue

▸ **subValue**(`value`: [AbstactValue](_units_.abstactvalue.md)‹[TimeUnit](../modules/_units_.md#timeunit)›): *this*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[subValue](_units_.abstactvalue.md#subvalue)*

*Defined in [units.ts:148](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L148)*

Substracts given value from existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹[TimeUnit](../modules/_units_.md#timeunit)› | value  |

**Returns:** *this*

___

### `Protected` toBaseUnit

▸ **toBaseUnit**(`unit`: [TimeUnit](../modules/_units_.md#timeunit), `value`: number): *number*

*Inherited from [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[toBaseUnit](_units_.abstractratiobasedvalue.md#protected-tobaseunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[toBaseUnit](_units_.abstactvalue.md#protected-abstract-tobaseunit)*

*Defined in [units.ts:202](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L202)*

Converts value to type's base unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [TimeUnit](../modules/_units_.md#timeunit) | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in base units