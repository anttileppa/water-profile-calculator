[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["units"](../modules/_units_.md) › [MassFractionValue](_units_.massfractionvalue.md)

# Class: MassFractionValue

Mass concentration of substance within another mass

## Hierarchy

  ↳ [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md)‹[MassFractionUnit](../modules/_units_.md#massfractionunit)›

  ↳ **MassFractionValue**

## Implements

* [Value](../interfaces/_units_.value.md)‹[MassFractionUnit](../modules/_units_.md#massfractionunit)›

## Index

### Constructors

* [constructor](_units_.massfractionvalue.md#constructor)

### Methods

* [add](_units_.massfractionvalue.md#add)
* [addValue](_units_.massfractionvalue.md#addvalue)
* [fromBaseUnit](_units_.massfractionvalue.md#protected-frombaseunit)
* [getBaseUnit](_units_.massfractionvalue.md#protected-getbaseunit)
* [getConvertRatio](_units_.massfractionvalue.md#protected-getconvertratio)
* [getValue](_units_.massfractionvalue.md#getvalue)
* [roundTo](_units_.massfractionvalue.md#protected-roundto)
* [setValue](_units_.massfractionvalue.md#setvalue)
* [sub](_units_.massfractionvalue.md#sub)
* [subValue](_units_.massfractionvalue.md#subvalue)
* [toBaseUnit](_units_.massfractionvalue.md#protected-tobaseunit)

## Constructors

###  constructor

\+ **new MassFractionValue**(`unit`: [MassFractionUnit](../modules/_units_.md#massfractionunit), `value`: number | null): *[MassFractionValue](_units_.massfractionvalue.md)*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[constructor](_units_.abstactvalue.md#constructor)*

*Defined in [units.ts:48](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L48)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassFractionUnit](../modules/_units_.md#massfractionunit) | value unit |
`value` | number &#124; null | value in given unit  |

**Returns:** *[MassFractionValue](_units_.massfractionvalue.md)*

## Methods

###  add

▸ **add**(`unit`: [MassFractionUnit](../modules/_units_.md#massfractionunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[add](_units_.abstactvalue.md#add)*

*Defined in [units.ts:115](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L115)*

Adds given value to existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassFractionUnit](../modules/_units_.md#massfractionunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  addValue

▸ **addValue**(`value`: [AbstactValue](_units_.abstactvalue.md)‹[MassFractionUnit](../modules/_units_.md#massfractionunit)›): *this*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[addValue](_units_.abstactvalue.md#addvalue)*

*Defined in [units.ts:134](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L134)*

Adds given value to existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹[MassFractionUnit](../modules/_units_.md#massfractionunit)› | value  |

**Returns:** *this*

___

### `Protected` fromBaseUnit

▸ **fromBaseUnit**(`unit`: [MassFractionUnit](../modules/_units_.md#massfractionunit), `value`: number): *number*

*Inherited from [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[fromBaseUnit](_units_.abstractratiobasedvalue.md#protected-frombaseunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[fromBaseUnit](_units_.abstactvalue.md#protected-abstract-frombaseunit)*

*Defined in [units.ts:215](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L215)*

Converts value from type's base unit into given unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassFractionUnit](../modules/_units_.md#massfractionunit) | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in given units

___

### `Protected` getBaseUnit

▸ **getBaseUnit**(): *[MassFractionUnit](../modules/_units_.md#massfractionunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[getBaseUnit](_units_.abstactvalue.md#protected-abstract-getbaseunit)*

*Defined in [units.ts:433](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L433)*

Returns value's base unit

**Returns:** *[MassFractionUnit](../modules/_units_.md#massfractionunit)*

value's base unit

___

### `Protected` getConvertRatio

▸ **getConvertRatio**(`unit`: [MassFractionUnit](../modules/_units_.md#massfractionunit)): *number*

*Overrides [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[getConvertRatio](_units_.abstractratiobasedvalue.md#protected-abstract-getconvertratio)*

*Defined in [units.ts:442](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L442)*

Returns convert ratio into base unit

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassFractionUnit](../modules/_units_.md#massfractionunit) | from unit  |

**Returns:** *number*

___

###  getValue

▸ **getValue**(`unit`: [MassFractionUnit](../modules/_units_.md#massfractionunit), `roundTo?`: number): *number | null*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[getValue](_units_.abstactvalue.md#getvalue)*

*Defined in [units.ts:77](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L77)*

Returns a value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassFractionUnit](../modules/_units_.md#massfractionunit) | value unit |
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

▸ **setValue**(`unit`: [MassFractionUnit](../modules/_units_.md#massfractionunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[setValue](_units_.abstactvalue.md#setvalue)*

*Defined in [units.ts:66](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L66)*

Sets a value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassFractionUnit](../modules/_units_.md#massfractionunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  sub

▸ **sub**(`unit`: [MassFractionUnit](../modules/_units_.md#massfractionunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[sub](_units_.abstactvalue.md#sub)*

*Defined in [units.ts:125](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L125)*

Substracts given value from existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassFractionUnit](../modules/_units_.md#massfractionunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  subValue

▸ **subValue**(`value`: [AbstactValue](_units_.abstactvalue.md)‹[MassFractionUnit](../modules/_units_.md#massfractionunit)›): *this*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[subValue](_units_.abstactvalue.md#subvalue)*

*Defined in [units.ts:148](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L148)*

Substracts given value from existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹[MassFractionUnit](../modules/_units_.md#massfractionunit)› | value  |

**Returns:** *this*

___

### `Protected` toBaseUnit

▸ **toBaseUnit**(`unit`: [MassFractionUnit](../modules/_units_.md#massfractionunit), `value`: number): *number*

*Inherited from [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[toBaseUnit](_units_.abstractratiobasedvalue.md#protected-tobaseunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[toBaseUnit](_units_.abstactvalue.md#protected-abstract-tobaseunit)*

*Defined in [units.ts:202](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L202)*

Converts value to type's base unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassFractionUnit](../modules/_units_.md#massfractionunit) | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in base units
