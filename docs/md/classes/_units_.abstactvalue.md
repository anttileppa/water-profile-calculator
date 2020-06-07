[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["units"](../modules/_units_.md) › [AbstactValue](_units_.abstactvalue.md)

# Class: AbstactValue <**U**>

Abstract base class for all values

## Type parameters

▪ **U**

## Hierarchy

* **AbstactValue**

  ↳ [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md)

## Implements

* [Value](../interfaces/_units_.value.md)‹U›

## Index

### Constructors

* [constructor](_units_.abstactvalue.md#constructor)

### Properties

* [value](_units_.abstactvalue.md#private-value)

### Methods

* [add](_units_.abstactvalue.md#add)
* [addValue](_units_.abstactvalue.md#addvalue)
* [fromBaseUnit](_units_.abstactvalue.md#protected-abstract-frombaseunit)
* [getBaseUnit](_units_.abstactvalue.md#protected-abstract-getbaseunit)
* [getValue](_units_.abstactvalue.md#getvalue)
* [roundTo](_units_.abstactvalue.md#protected-roundto)
* [setValue](_units_.abstactvalue.md#setvalue)
* [sub](_units_.abstactvalue.md#sub)
* [subValue](_units_.abstactvalue.md#subvalue)
* [toBaseUnit](_units_.abstactvalue.md#protected-abstract-tobaseunit)

## Constructors

###  constructor

\+ **new AbstactValue**(`unit`: U, `value`: number | null): *[AbstactValue](_units_.abstactvalue.md)*

*Defined in [units.ts:49](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L49)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | U | value unit |
`value` | number &#124; null | value in given unit  |

**Returns:** *[AbstactValue](_units_.abstactvalue.md)*

## Properties

### `Private` value

• **value**: *number | null* = null

*Defined in [units.ts:49](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L49)*

## Methods

###  add

▸ **add**(`unit`: U, `value`: number | null): *void*

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

*Defined in [units.ts:135](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L135)*

Adds given value to existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹U› | value  |

**Returns:** *this*

___

### `Protected` `Abstract` fromBaseUnit

▸ **fromBaseUnit**(`unit`: U, `value`: number): *number*

*Defined in [units.ts:178](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L178)*

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

*Defined in [units.ts:88](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L88)*

Returns value's base unit

**Returns:** *U*

value's base unit

___

###  getValue

▸ **getValue**(`unit`: U, `roundTo?`: number): *number | null*

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

*Defined in [units.ts:149](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L149)*

Substracts given value from existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹U› | value  |

**Returns:** *this*

___

### `Protected` `Abstract` toBaseUnit

▸ **toBaseUnit**(`unit`: U, `value`: number): *number*

*Defined in [units.ts:167](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L167)*

Converts value to type's base unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | U | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in base units
