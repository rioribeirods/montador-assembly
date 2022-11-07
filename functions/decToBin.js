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

module.exports = decToBin;