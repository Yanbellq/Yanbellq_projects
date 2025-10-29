function entity<T>(args: T): T {
    return args
}

entity<number>(1)
entity<string>('2')



const entity2 = <T>(args: T): T => {
    return args
}

entity2<number>(1)
entity2<string>('2')



class Channel<T> {
    private name: T

    constructor(name: T) {
        this.name = name
    }

    getName(): T {
        return this.name
    }
}


interface IPair<K, V> {
    key: K
    value: V
}

const pair1: IPair<string, number> = {
    key: '1',
    value: 1
}

const pair2: IPair<string, string> = {
    key: '1',
    value: '1'
}


type TypePair<K, V> = {
    key: K
    value: V
}

const pair3: TypePair<string, number> = {
    key: '1',
    value: 1
}

const pair4: TypePair<string, string> = {
    key: '1',
    value: '1'
}


type TypeLength = {
    length: number
}

function getNameLength<T extends TypeLength>(entity: T): number {
    return entity.length
}

getNameLength('sdfgfds')
getNameLength([0, 1, 2])