type TypeUser = {
    name: string
    age: number
}

type TypeAddress = {
    city: string
    country: string
}


const user: TypeUser = {
    name: 'Max',
    age: 19
}

const address: TypeAddress = {
    city: 'CHE',
    country: 'UKR'
}



let common: TypeUser & TypeAddress

common = {
    ...user,
    ...address
}

console.log(common);