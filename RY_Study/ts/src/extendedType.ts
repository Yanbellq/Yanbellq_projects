type TypeIsNumber<T> = T extends number ? 'yes' : 'no'

type Type1 = TypeIsNumber<number>
type Type2 = TypeIsNumber<string>


type TypeBrand = 'bmw' | 'mclaren' | 'mercedes'
type TypePrice = '$100000' | '$400000' | '$500000'

type TypeCar = `${TypeBrand} ${TypePrice}`


const car: TypeCar = 'mclaren $100000'