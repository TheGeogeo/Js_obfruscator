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

            const options = {
                mangle: {
                    toplevel: true,
                },
                nameCache: {}
            }
            let minify = UglifyJS.minify(code, options);

            const option = {
                compact: true,
                controlFlowFlattening: false,
                controlFlowFlatteningThreshold: 0.75,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 5,
                debugProtection: false,
                debugProtectionInterval: 0,
                disableConsoleOutput: false,
                domainLock: [],
                domainLockRedirectUrl: 'about:blank',
                forceTransformStrings: [],
                identifierNamesCache: null,
                identifierNamesGenerator: 'hexadecimal',
                identifiersDictionary: [],
                identifiersPrefix: '',
                ignoreRequireImports: false,
                inputFileName: '',
                log: false,
                numbersToExpressions: false,
                optionsPreset: 'default',
                renameGlobals: false,
                renameProperties: false,
                renamePropertiesMode: 'safe',
                reservedNames: [],
                reservedStrings: [],
                seed: 0,
                selfDefending: false,
                simplify: true,
                sourceMap: false,
                sourceMapBaseUrl: '',
                sourceMapFileName: '',
                sourceMapMode: 'separate',
                sourceMapSourcesMode: 'sources-content',
                splitStrings: true,
                splitStringsChunkLength: 10,
                stringArray: true,
                stringArrayCallsTransform: true,
                stringArrayCallsTransformThreshold: 0.5,
                stringArrayEncoding: ['rc4'],
                stringArrayIndexesType: [
                    'hexadecimal-number'
                ],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayShuffle: true,
                stringArrayWrappersCount: 1,
                stringArrayWrappersChainedCalls: true,
                stringArrayWrappersParametersMaxCount: 2,
                stringArrayWrappersType: 'variable',
                stringArrayThreshold: 0.75,
                target: 'browser',
                transformObjectKeys: false,
                unicodeEscapeSequence: false
            }
            let obfuscat = jsObfuscator.obfuscate(minify.code, option);

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
