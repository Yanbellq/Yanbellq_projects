let array:string[] // или => let array:Array<string>

array = ['1', '2'];

const numbers:ReadonlyArray<number> = [0, 1, 2, 3]


type TypeArray = [number, string, null]  // => Кортежи
const newArray:TypeArray = [1, '2', null]


type NamedTypeArray = [id: number, name: string, isLogined: boolean]  // => Именные Кортежи
const newNamedArray:NamedTypeArray = [1, 'Maksym', true]