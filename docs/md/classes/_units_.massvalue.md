[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["units"](../modules/_units_.md) › [MassValue](_units_.massvalue.md)

# Class: MassValue

Mass value

## Hierarchy

  ↳ [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md)‹[MassUnit](../modules/_units_.md#massunit)›

  ↳ **MassValue**

## Implements

* [Value](../interfaces/_units_.value.md)‹[MassUnit](../modules/_units_.md#massunit)›

## Index

### Constructors

* [constructor](_units_.massvalue.md#constructor)

### Methods

* [add](_units_.massvalue.md#add)
* [addValue](_units_.massvalue.md#addvalue)
* [fromBaseUnit](_units_.massvalue.md#protected-frombaseunit)
* [getBaseUnit](_units_.massvalue.md#protected-getbaseunit)
* [getConvertRatio](_units_.massvalue.md#protected-getconvertratio)
* [getMassConcentration](_units_.massvalue.md#getmassconcentration)
* [getMassFraction](_units_.massvalue.md#getmassfraction)
* [getValue](_units_.massvalue.md#getvalue)
* [roundTo](_units_.massvalue.md#protected-roundto)
* [setValue](_units_.massvalue.md#setvalue)
* [sub](_units_.massvalue.md#sub)
* [subValue](_units_.massvalue.md#subvalue)
* [toBaseUnit](_units_.massvalue.md#protected-tobaseunit)

## Constructors

###  constructor

\+ **new MassValue**(`unit`: [MassUnit](../modules/_units_.md#massunit), `value`: number | null): *[MassValue](_units_.massvalue.md)*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[constructor](_units_.abstactvalue.md#constructor)*

*Defined in [units.ts:48](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L48)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassUnit](../modules/_units_.md#massunit) | value unit |
`value` | number &#124; null | value in given unit  |

**Returns:** *[MassValue](_units_.massvalue.md)*

## Methods

###  add

▸ **add**(`unit`: [MassUnit](../modules/_units_.md#massunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[add](_units_.abstactvalue.md#add)*

*Defined in [units.ts:115](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L115)*

Adds given value to existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassUnit](../modules/_units_.md#massunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  addValue

▸ **addValue**(`value`: [AbstactValue](_units_.abstactvalue.md)‹[MassUnit](../modules/_units_.md#massunit)›): *this*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[addValue](_units_.abstactvalue.md#addvalue)*

*Defined in [units.ts:134](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L134)*

Adds given value to existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹[MassUnit](../modules/_units_.md#massunit)› | value  |

**Returns:** *this*

___

### `Protected` fromBaseUnit

▸ **fromBaseUnit**(`unit`: [MassUnit](../modules/_units_.md#massunit), `value`: number): *number*

*Inherited from [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[fromBaseUnit](_units_.abstractratiobasedvalue.md#protected-frombaseunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[fromBaseUnit](_units_.abstactvalue.md#protected-abstract-frombaseunit)*

*Defined in [units.ts:215](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L215)*

Converts value from type's base unit into given unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassUnit](../modules/_units_.md#massunit) | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in given units

___

### `Protected` getBaseUnit

▸ **getBaseUnit**(): *[MassUnit](../modules/_units_.md#massunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[getBaseUnit](_units_.abstactvalue.md#protected-abstract-getbaseunit)*

*Defined in [units.ts:288](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L288)*

Returns value's base unit

**Returns:** *[MassUnit](../modules/_units_.md#massunit)*

value's base unit

___

### `Protected` getConvertRatio

▸ **getConvertRatio**(`unit`: [MassUnit](../modules/_units_.md#massunit)): *number*

*Overrides [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[getConvertRatio](_units_.abstractratiobasedvalue.md#protected-abstract-getconvertratio)*

*Defined in [units.ts:297](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L297)*

Returns convert ratio into base unit

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassUnit](../modules/_units_.md#massunit) | from unit  |

**Returns:** *number*

___

###  getMassConcentration

▸ **getMassConcentration**(`waterVolume`: [VolumeValue](_units_.volumevalue.md)): *[MassConcentrationValue](_units_.massconcentrationvalue.md) | null*

*Defined in [units.ts:267](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L267)*

Returns mass concentration in water for given volume of water

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`waterVolume` | [VolumeValue](_units_.volumevalue.md) | water volume |

**Returns:** *[MassConcentrationValue](_units_.massconcentrationvalue.md) | null*

mass concentration in water for given volume of water

___

###  getMassFraction

▸ **getMassFraction**(`mass`: [MassValue](_units_.massvalue.md)): *[MassFractionValue](_units_.massfractionvalue.md) | null*

*Defined in [units.ts:279](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L279)*

Returns mass fraction

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`mass` | [MassValue](_units_.massvalue.md) | mass |

**Returns:** *[MassFractionValue](_units_.massfractionvalue.md) | null*

mass fraction

___

###  getValue

▸ **getValue**(`unit`: [MassUnit](../modules/_units_.md#massunit), `roundTo?`: number): *number | null*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[getValue](_units_.abstactvalue.md#getvalue)*

*Defined in [units.ts:77](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L77)*

Returns a value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassUnit](../modules/_units_.md#massunit) | value unit |
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

▸ **setValue**(`unit`: [MassUnit](../modules/_units_.md#massunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[setValue](_units_.abstactvalue.md#setvalue)*

*Defined in [units.ts:66](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L66)*

Sets a value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassUnit](../modules/_units_.md#massunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  sub

▸ **sub**(`unit`: [MassUnit](../modules/_units_.md#massunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[sub](_units_.abstactvalue.md#sub)*

*Defined in [units.ts:125](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L125)*

Substracts given value from existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassUnit](../modules/_units_.md#massunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  subValue

▸ **subValue**(`value`: [AbstactValue](_units_.abstactvalue.md)‹[MassUnit](../modules/_units_.md#massunit)›): *this*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[subValue](_units_.abstactvalue.md#subvalue)*

*Defined in [units.ts:148](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L148)*

Substracts given value from existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹[MassUnit](../modules/_units_.md#massunit)› | value  |

**Returns:** *this*

___

### `Protected` toBaseUnit

▸ **toBaseUnit**(`unit`: [MassUnit](../modules/_units_.md#massunit), `value`: number): *number*

*Inherited from [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[toBaseUnit](_units_.abstractratiobasedvalue.md#protected-tobaseunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[toBaseUnit](_units_.abstactvalue.md#protected-abstract-tobaseunit)*

*Defined in [units.ts:202](https://github.com/anttileppa/water-profile-calculator/blob/997b88f/src/units.ts#L202)*

Converts value to type's base unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassUnit](../modules/_units_.md#massunit) | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in base units
