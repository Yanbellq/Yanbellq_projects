"use strict";
function entity(args) {
    return args;
}
entity(1);
entity('2');
const entity2 = (args) => {
    return args;
};
entity2(1);
entity2('2');
class Channel {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
const pair1 = {
    key: '1',
    value: 1
};
const pair2 = {
    key: '1',
    value: '1'
};
const pair3 = {
    key: '1',
    value: 1
};
const pair4 = {
    key: '1',
    value: '1'
};
function getNameLength(entity) {
    return entity.length;
}
getNameLength('sdfgfds');
getNameLength([0, 1, 2]);
