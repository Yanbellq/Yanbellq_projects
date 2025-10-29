interface IUserAge {
    age: number
}

interface IUser extends IUserAge {
    name: string
    email:string
}

const user1: IUser = {
    email: 'w324refdsswq23@example.com',
    name: 'Max',
    age: 19
}


type TypePerson = {
    age: number
}

type TypeUser1 = {
    name: string
    email:string
} & TypePerson   // Возможно также предложение "или" => | TypePerson

const user2: TypeUser1 = {
    email: 'w324refdsswq23@example.com',
    name: 'Max',
    age: 19
}