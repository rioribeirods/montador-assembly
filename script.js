const express = require('express');
const fs = require('node:fs');
const app = express();
const port = 3001;
const convert = require("./functions/convert");

app.listen(port, () => {
    return 0;
});

const readline = require('readline');
const stream = require('stream');
function readLines({ input }) {
    const output = new stream.PassThrough({ objectMode: true });
    const rl = readline.createInterface({ input });
    rl.on("line", line => {
        output.write(line);
    });
    rl.on("close", () => {
        output.push(null);
    });
    return output;
}
const input = fs.createReadStream("./assembly.txt");

(async () => {

    try {
        fs.accessSync('./resultado.txt', fs.constants.F_OK);
        fs.unlink('./resultado.txt', (err) => {
            console.log(err)
        });
    } catch (err) {
        console.log('file not found');
        console.error(err);
    }

    for await (const line of readLines({ input })) {
        fs.appendFile("./resultado.txt", convert(line),
            (err) => console.log('Arquivo atualizado!', { err }))
    }

})();

// let assembly = './assembly.txt';
// let linesCount = 0;
// let rl = readline.createInterface({
//     input: fs.createReadStream(assembly),
//     output: process.stdout,
//     terminal: false
// });
// rl.on('line', function (line) {
//     linesCount++;
// });
// rl.on('close', function () {
//     console.log(linesCount);
// });

// let resultado = './resultado.txt';
// let resultCount = 0;
// let readingline = readline.createInterface({
//     input: fs.createReadStream(resultado),
//     output: process.stdout,
//     terminal: false
// });
// readingline.on('line', function (line) {
//     resultCount++;
// });
// readingline.on('close', function () {
//     console.log(resultCount);
// });
