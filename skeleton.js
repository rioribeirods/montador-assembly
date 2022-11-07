function skeleton(array, op, opCode, special) {
    if (array.length == 2) {
        special = "000000"
        return special + array[0] + array[1] + "0000000000" + opCode
    } else if (array.length === 3) {
        if (op.includes("i", 0)) {
            let immediate = array[2]
            while (immediate.length < 16) {
                const zero = "0"
                immediate = zero.concat(immediate)
            }
            return opCode + array[0] + array[1] + immediate
        } else if (op.includes("sll")|| op.includes("sra")|| op.includes("srl")) {
            return special + "00000" + array[1] + array[0] + array[2] + opCode
        } else if (op.includes("mul")) {
            special = "011100"
            return special + array[2] + array[0] + array[1] + "00000" + opCode
        } else {
            return special + array[2] + array[0] + array[1] + "00000" + opCode
        };
    } else {
        return "00000000000000000000000000" + opCode
    };
};

module.exports = skeleton;