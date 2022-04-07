const fs = require('fs');
const readline = require('readline');
const jsObfuscator = require("javascript-obfuscator");
const UglifyJS = require("uglify-js");

const notObf = "Not_Obfuscate/";
const Obf = "Obfuscate/";
const files = fs.readdirSync(notObf);

if (files.length > 0) {

    for (const file of files) {
        console.log("> " + file);
    }

    askQuestion("\x1b[33m\x1b[33mWhat file do you want Obfuscate ? >>> \x1b[0m").then((name) => {

        fs.readFile(notObf + name, 'utf-8', (error, code) => {
            if (error) return console.log(error);

            let options = {
                mangle: {
                    toplevel: true,
                },
                nameCache: {}
            }
            let minify = UglifyJS.minify(code, options);
            let obfuscat = jsObfuscator.obfuscate(minify.code);

            fs.writeFile(Obf + name, obfuscat.getObfuscatedCode(), (err) => {
                if (err) return console.log(err);
                console.log("\x1b[32mObfuscate with succes!\x1b[0m");
            })
        });

    });

}
else console.log("\x1b[31m0 file found in " + notObf + "\x1b[0m");

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
