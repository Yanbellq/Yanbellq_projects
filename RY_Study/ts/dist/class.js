"use strict";
class Car {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getInfo() {
        return `${this.name} - ${this.price}`;
    }
}
class Bus extends Car {
    constructor(name, price, capabilities) {
        super(name, price);
        this.capabilities = capabilities;
    }
    getInfo() {
        return super.getInfo() + ` - ${this.capabilities}`;
    }
    test() {
        // return super.getInfo()
        return this.getInfo();
    }
}
let bmw = new Car('BMW', 100000);
// console.log(bmw.getInfo());
let neoplan = new Bus('Neoplan', 15260, 120);
console.log(neoplan.getInfo());
