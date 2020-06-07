[water-profile-calculator](../README.md) › [Globals](../globals.md) › ["ions"](_ions_.md)

# Module: "ions"

## Index

### Interfaces

* [RecommendedIonConcentrations](../interfaces/_ions_.recommendedionconcentrations.md)
* [RecommendedIonLevels](../interfaces/_ions_.recommendedionlevels.md)
* [SaltIonMap](../interfaces/_ions_.saltionmap.md)
* [SaltIons](../interfaces/_ions_.saltions.md)

### Type aliases

* [Ion](_ions_.md#ion)
* [IonLevel](_ions_.md#ionlevel)

### Variables

* [ionList](_ions_.md#const-ionlist)

### Object literals

* [saltIonMap](_ions_.md#const-saltionmap)

## Type aliases

###  Ion

Ƭ **Ion**: *"calcium" | "magnesium" | "sodium" | "sulfate" | "chloride" | "bicarbonate"*

*Defined in [ions.ts:99](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/ions.ts#L99)*

Type for ion names

___

###  IonLevel

Ƭ **IonLevel**: *"recommended" | "toolow" | "toohigh" | "harmful"*

*Defined in [ions.ts:70](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/ions.ts#L70)*

Ion level type

## Variables

### `Const` ionList

• **ionList**: *[Ion](_ions_.md#ion)[]* = ["calcium", "magnesium", "sodium", "sulfate", "chloride", "bicarbonate"]

*Defined in [ions.ts:104](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/ions.ts#L104)*

List of ion names

## Object literals

### `Const` saltIonMap

### ▪ **saltIonMap**: *object*

*Defined in [ions.ts:32](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/ions.ts#L32)*

Salt ion concentrations

▪ **bakingSoda**: *object*

*Defined in [ions.ts:53](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/ions.ts#L53)*

* **bicarbonate**: *[BicarbonateValue](../classes/_units_.bicarbonatevalue.md)‹›* = new BicarbonateValue("mg/l", 61/84)

* **sodium**: *[SodiumValue](../classes/_units_.sodiumvalue.md)‹›* = new SodiumValue("mg/l", 23/84)

▪ **calciumChloride**: *object*

*Defined in [ions.ts:45](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/ions.ts#L45)*

* **calcium**: *[CalciumValue](../classes/_units_.calciumvalue.md)‹›* = new CalciumValue("mg/l", 40.08/147.02)

* **chloride**: *[ChlorideValue](../classes/_units_.chloridevalue.md)‹›* = new ChlorideValue("mg/l", 70.9/147.02)

▪ **chalkDissolved**: *object*

*Defined in [ions.ts:61](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/ions.ts#L61)*

* **bicarbonate**: *[BicarbonateValue](../classes/_units_.bicarbonatevalue.md)‹›* = new BicarbonateValue("mg/l", (61/100.09)*2)

* **calcium**: *[CalciumValue](../classes/_units_.calciumvalue.md)‹›* = new CalciumValue("mg/l", 40.08/100.09)

▪ **chalkUndissolved**: *object*

*Defined in [ions.ts:57](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/ions.ts#L57)*

* **bicarbonate**: *[BicarbonateValue](../classes/_units_.bicarbonatevalue.md)‹›* = new BicarbonateValue("mg/l", (61 / 100.09))

* **calcium**: *[CalciumValue](../classes/_units_.calciumvalue.md)‹›* = new CalciumValue("mg/l", (40.08/100.09) / 2)

▪ **epsom**: *object*

*Defined in [ions.ts:37](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/ions.ts#L37)*

* **magnesium**: *[MagnesiumValue](../classes/_units_.magnesiumvalue.md)‹›* = new MagnesiumValue("mg/l", 24.3/246.51)

* **sulfate**: *[SulfateValue](../classes/_units_.sulfatevalue.md)‹›* = new SulfateValue("mg/l", 96.07/246.51)

▪ **gypsum**: *object*

*Defined in [ions.ts:33](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/ions.ts#L33)*

* **calcium**: *[CalciumValue](../classes/_units_.calciumvalue.md)‹›* = new CalciumValue("mg/l", 40.08/172.19)

* **sulfate**: *[SulfateValue](../classes/_units_.sulfatevalue.md)‹›* = new SulfateValue("mg/l", 96.07/172.19)

▪ **magnesiumChloride**: *object*

*Defined in [ions.ts:49](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/ions.ts#L49)*

* **chloride**: *[ChlorideValue](../classes/_units_.chloridevalue.md)‹›* = new ChlorideValue("mg/l", 70.9/203.32)

* **magnesium**: *[MagnesiumValue](../classes/_units_.magnesiumvalue.md)‹›* = new MagnesiumValue("mg/l", 24.3/203.32)

▪ **tableSalt**: *object*

*Defined in [ions.ts:41](https://github.com/anttileppa/water-profile-calculator/blob/5b306f6/src/ions.ts#L41)*

* **chloride**: *[ChlorideValue](../classes/_units_.chloridevalue.md)‹›* = new ChlorideValue("mg/l", 35.45/58.44)

* **sodium**: *[SodiumValue](../classes/_units_.sodiumvalue.md)‹›* = new SodiumValue("mg/l", 23/58.44)
