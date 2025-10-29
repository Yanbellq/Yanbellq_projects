interface ICar {
    id: number
    name: string
    price: number
    yearBuild: number
}

interface ICarCreate extends Omit<ICar, 'id'> { }  // Интерфейс без какого-то (каких-то) поля(полей)
interface ICarId extends Pick<ICar, 'id'> { }      // Интерфейс только с этим полем(полями)
interface IOptionalCar extends Partial<ICar> { }   // Интерфейс где все поля НЕ обязательные!!!
interface IRequiredCar extends Required<ICar> { }   // Интерфейс где все поля Обязательные!!! (В изначальном интерфейсе все поля должны быть не обезательные => id?: number)
interface IReadonlyCar extends Readonly<ICar> { }   // Интерфейс где все поля только для чтения

type TypeCarRecord = Record<'name' | 'price', string | number>

type TypeGetName = () => string
type Return = ReturnType<TypeGetName>

type Any1 = Extract<'max' | 'andrey', 'andrey' | 'misha'>
type Any2 = Exclude<'max' | 'andrey', 'andrey' | 'misha'>
type NotNull = NonNullable<string | number | null | undefined>

const car3: ICarCreate = {
    name: 'BMW',
    price: 10000,
    yearBuild: 2004
}

const car4: ICarId = {
    id: 4
}

const car5: IOptionalCar = { }

const car6: TypeCarRecord = {
    name: '1',  // Если это record то те поля которые мы вибираем могут быть тем что мы выберем, типа здесь => name: '1' | 1  - может быть и строкой и числом, в зависимости от выбора
    price: 3  // Здесь точно также как и с именем - и числом может быть и строкой
}