[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["units"](../modules/_units_.md) › [BicarbonateValue](_units_.bicarbonatevalue.md)

# Class: BicarbonateValue

Bicarbonate ion value

## Hierarchy

  ↳ [MassConcentrationValue](_units_.massconcentrationvalue.md)

  ↳ **BicarbonateValue**

## Implements

* [Value](../interfaces/_units_.value.md)‹[MassConcentrationUnit](../modules/_units_.md#massconcentrationunit)›

## Index

### Constructors

* [constructor](_units_.bicarbonatevalue.md#constructor)

### Methods

* [add](_units_.bicarbonatevalue.md#add)
* [addValue](_units_.bicarbonatevalue.md#addvalue)
* [fromBaseUnit](_units_.bicarbonatevalue.md#protected-frombaseunit)
* [getBaseUnit](_units_.bicarbonatevalue.md#protected-getbaseunit)
* [getConvertRatio](_units_.bicarbonatevalue.md#protected-getconvertratio)
* [getMass](_units_.bicarbonatevalue.md#getmass)
* [getValue](_units_.bicarbonatevalue.md#getvalue)
* [roundTo](_units_.bicarbonatevalue.md#protected-roundto)
* [setValue](_units_.bicarbonatevalue.md#setvalue)
* [sub](_units_.bicarbonatevalue.md#sub)
* [subValue](_units_.bicarbonatevalue.md#subvalue)
* [toBaseUnit](_units_.bicarbonatevalue.md#protected-tobaseunit)

## Constructors

###  constructor

\+ **new BicarbonateValue**(`unit`: [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit), `value`: number | null): *[BicarbonateValue](_units_.bicarbonatevalue.md)*

*Overrides [MassConcentrationValue](_units_.massconcentrationvalue.md).[constructor](_units_.massconcentrationvalue.md#constructor)*

*Defined in [units.ts:626](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L626)*

Constructor

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit) | value unit |
`value` | number &#124; null | value in given unit  |

**Returns:** *[BicarbonateValue](_units_.bicarbonatevalue.md)*

## Methods

###  add

▸ **add**(`unit`: [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[add](_units_.abstactvalue.md#add)*

*Defined in [units.ts:116](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L116)*

Adds given value to existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  addValue

▸ **addValue**(`value`: [AbstactValue](_units_.abstactvalue.md)‹[MassConcentrationUnit](../modules/_units_.md#massconcentrationunit)›): *this*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[addValue](_units_.abstactvalue.md#addvalue)*

*Defined in [units.ts:135](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L135)*

Adds given value to existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹[MassConcentrationUnit](../modules/_units_.md#massconcentrationunit)› | value  |

**Returns:** *this*

___

### `Protected` fromBaseUnit

▸ **fromBaseUnit**(`unit`: [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit), `value`: number): *number*

*Inherited from [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[fromBaseUnit](_units_.abstractratiobasedvalue.md#protected-frombaseunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[fromBaseUnit](_units_.abstactvalue.md#protected-abstract-frombaseunit)*

*Defined in [units.ts:216](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L216)*

Converts value from type's base unit into given unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit) | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in given units

___

### `Protected` getBaseUnit

▸ **getBaseUnit**(): *[MassConcentrationUnit](../modules/_units_.md#massconcentrationunit)*

*Inherited from [MassConcentrationValue](_units_.massconcentrationvalue.md).[getBaseUnit](_units_.massconcentrationvalue.md#protected-getbaseunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[getBaseUnit](_units_.abstactvalue.md#protected-abstract-getbaseunit)*

*Defined in [units.ts:434](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L434)*

Returns value's base unit

**Returns:** *[MassConcentrationUnit](../modules/_units_.md#massconcentrationunit)*

value's base unit

___

### `Protected` getConvertRatio

▸ **getConvertRatio**(`unit`: [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit)): *number*

*Inherited from [MassConcentrationValue](_units_.massconcentrationvalue.md).[getConvertRatio](_units_.massconcentrationvalue.md#protected-getconvertratio)*

*Overrides [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[getConvertRatio](_units_.abstractratiobasedvalue.md#protected-abstract-getconvertratio)*

*Defined in [units.ts:443](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L443)*

Returns convert ratio into base unit

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit) | from unit  |

**Returns:** *number*

___

###  getMass

▸ **getMass**(`volume`: [VolumeValue](_units_.volumevalue.md)): *[MassValue](_units_.massvalue.md)‹›*

*Inherited from [MassConcentrationValue](_units_.massconcentrationvalue.md).[getMass](_units_.massconcentrationvalue.md#getmass)*

*Defined in [units.ts:425](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L425)*

Returns mass in given volume

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`volume` | [VolumeValue](_units_.volumevalue.md) | volume |

**Returns:** *[MassValue](_units_.massvalue.md)‹›*

mass in given volume

___

###  getValue

▸ **getValue**(`unit`: [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit), `roundTo?`: number): *number | null*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[getValue](_units_.abstactvalue.md#getvalue)*

*Defined in [units.ts:78](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L78)*

Returns a value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit) | value unit |
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

▸ **setValue**(`unit`: [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[setValue](_units_.abstactvalue.md#setvalue)*

*Defined in [units.ts:67](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L67)*

Sets a value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  sub

▸ **sub**(`unit`: [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit), `value`: number | null): *void*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[sub](_units_.abstactvalue.md#sub)*

*Defined in [units.ts:126](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L126)*

Substracts given value from existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit) | value unit |
`value` | number &#124; null | numeric value in given unit  |

**Returns:** *void*

___

###  subValue

▸ **subValue**(`value`: [AbstactValue](_units_.abstactvalue.md)‹[MassConcentrationUnit](../modules/_units_.md#massconcentrationunit)›): *this*

*Inherited from [AbstactValue](_units_.abstactvalue.md).[subValue](_units_.abstactvalue.md#subvalue)*

*Defined in [units.ts:149](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L149)*

Substracts given value from existing value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [AbstactValue](_units_.abstactvalue.md)‹[MassConcentrationUnit](../modules/_units_.md#massconcentrationunit)› | value  |

**Returns:** *this*

___

### `Protected` toBaseUnit

▸ **toBaseUnit**(`unit`: [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit), `value`: number): *number*

*Inherited from [AbstractRatioBasedValue](_units_.abstractratiobasedvalue.md).[toBaseUnit](_units_.abstractratiobasedvalue.md#protected-tobaseunit)*

*Overrides [AbstactValue](_units_.abstactvalue.md).[toBaseUnit](_units_.abstactvalue.md#protected-abstract-tobaseunit)*

*Defined in [units.ts:203](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/units.ts#L203)*

Converts value to type's base unit

Base unit is an unit the value is stored internally

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`unit` | [MassConcentrationUnit](../modules/_units_.md#massconcentrationunit) | value unit |
`value` | number | numeric value in given unit |

**Returns:** *number*

numeric value in base units
