const fs = require('fs');
const readline = require('readline');
const jsObfuscator = require("javascript-obfuscator");

async function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

askQuestion("\x1b[33m\x1b[33mWhat file do you want Obfuscate ? >>> \x1b[0m").then((name) => {

    fs.readFile("Not_Obfuscate/" + name, 'utf-8', (error, code) => {
        if (error) return console.log(error);

        let obfuscat = jsObfuscator.obfuscate(code);

        fs.writeFile("Obfuscate/" + name, obfuscat.getObfuscatedCode(), (err) => {
            if (err) return console.log(err);
            console.log("\x1b[32mObfuscate with succes!\x1b[0m");
        })
    });

})