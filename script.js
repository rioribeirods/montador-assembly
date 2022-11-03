const express = require('express');
const fs = require('node:fs');
const app = express();
const port = 3001;
const lib = require("./lib.js")
const lista = require("./lista.js")
const tenZeros = "0000000000"

app.listen(port, () => {
    return 0;
});

function Skeleton(array, op, opCode, special) {
    if (array.length == 2) {
        special = "000000"
        return special + array[0] + array[1] + tenZeros + opCode
    } else if (array.length === 3) {
        if (op.includes("i", 0) == true) {
            let immediate = array[2]
            while (immediate.length < 16) {
                const zero = "0"
                immediate = zero.concat(immediate)
            }
            return opCode + array[0] + array[1] + immediate
        } else if (op.includes("sll") == true || op.includes("sra") == true || op.includes("srl") == true) {
            return special + "00000" + array[1] + array[0] + array[2] + opCode
        } else if (op.includes("mul") == true) {
            special = "011100"
            return special + array[2] + array[0] + array[1] + "00000" + opCode
        } else {
            return special + array[2] + array[0] + array[1] + "00000" + opCode
        }
    } else {
        return "00000000000000000000000000" + opCode
    }
}

function convertToHex(bin) {
    let hexa = [];
    let dec = 0
    for (let i = 0; i < bin.length; i++) {
        dec = parseInt(bin[i], 2)
        if (dec >= 10) {
            dec = dec.toString(16).toUpperCase()
        }
        hexa.push(dec)
    }
    let result = "";
    for (let i = 0; i < hexa.length; i++) {
        hexa[i] = hexa[i].toString(10)
        result = result + hexa[i]
    }
    return result
}

function decToBin(number) {
    let values = [];
    for (let i = 0; i < number.length; i++) {
        let bin = parseInt(number[i])
        let result = bin.toString(2)
        while (result.length < 5) {
            const zero = "0"
            result = zero.concat(result)
        }
        values.push(result)
    }
    return values
}

function convertAdd(string) {
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
    const result = Skeleton(values, op, opCode, special)
    let array = result.match(/.{1,4}/g)
    const final = convertToHex(array);
    return final + "\r\n"
};


const promisses = require('node:fs/promises');

(async () => {
    const file = await promisses.open('./assembly.txt');

    try {
        fs.accessSync('./resultado.txt', fs.constants.F_OK);
        fs.unlink('./resultado.txt', (err) => {
            console.log(err)
        });
    } catch (err) {
        console.log('file not found');
        console.error(err);
    }

    for await (const line of file.readLines()) {
        console.log(convertAdd(line));
        fs.appendFile("./resultado.txt", convertAdd(line),
            (err) => console.log('Arquivo atualizado!', { err }))
    }
})();


