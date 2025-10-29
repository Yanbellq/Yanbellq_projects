"use strict";
const user = {
    name: 'Max',
    age: 19
};
const address = {
    city: 'CHE',
    country: 'UKR'
};
let common;
common = Object.assign(Object.assign({}, user), address);
console.log(common);
