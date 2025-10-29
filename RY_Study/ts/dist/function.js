"use strict";
function getChannel(name) {
    return { name };
}
const getChannelName = name => {
    return { name };
};
const getNumbers = (...numbers) => {
    return numbers;
};
function getCar(name, price) {
    return price ? `Name: ${name}, Price: ${price}` : `Name: ${name}`;
}
const car1 = getCar('BMW');
const car2 = getCar('BMW', 10000);
console.log(car1);
console.log(car2);
