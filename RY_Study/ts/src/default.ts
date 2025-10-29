interface User {
    name: string
    surname: string
    email: string
    password: string
}

const person: User = {
    name: 'Maksym',
    surname: 'Hrushko',
    email: 'yanbellq@gmail.com',
    password: 'testpassword123',
}

console.log(person);