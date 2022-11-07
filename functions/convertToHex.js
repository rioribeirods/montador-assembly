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

module.exports = convertToHex;