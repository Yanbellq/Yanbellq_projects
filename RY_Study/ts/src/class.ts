class Car {
    name: string
    price: number

    constructor(name: string, price: number) {
        this.name = name
        this.price = price
    }

    protected getInfo(): string {
        return `${this.name} - ${this.price}`
    }
    
    // private getInfo(): string {
    //     return `${this.name} - ${this.price}`
    // }
    
    // getInfo(): string {
    //     return `${this.name} - ${this.price}`
    // }
}

class Bus extends Car {
    capabilities: number

    constructor(name: string, price: number, capabilities: number) {
        super(name, price)
        this.capabilities = capabilities
    }
    
    
    override getInfo(): string {
        return super.getInfo() + ` - ${this.capabilities}`
    }
    
    test() {
        // return super.getInfo()
        return this.getInfo()
    }
}


let bmw = new Car('BMW', 100000);
// console.log(bmw.getInfo());

let neoplan = new Bus('Neoplan', 15260, 120)
console.log(neoplan.getInfo());