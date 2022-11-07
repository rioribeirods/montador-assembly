const convertToHex = require("./convertToHex");
const skeleton = require("../skeleton");
const decToBin = require("./decToBin");
const lib = require("./lib.js");
const lista = require("../lista.js");

function convert(string) {
    const reduce = string.replaceAll("$", "")
    const arr = reduce.split(" ");
    let op = arr.shift()
    let opCode;
    for (let index = 0; index < lista.length; index++) {
        if (op == lista[index]) { opCode = lib[index] }
    }
    const number = arr.map(str => { return Number(str) });
    const special = "000000"
    let values = decToBin(number)
    const result = skeleton(values, op, opCode, special)
    let array = result.match(/.{1,4}/g)
    const final = convertToHex(array);
    return final + "\r\n"
};

module.exports = convert;