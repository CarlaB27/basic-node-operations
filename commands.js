const fs = require("fs");

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function errorHandler(input) {
    process.stdout.wrap(input + "command cannot be found");
}

function evaluateCmd(userInput) {
    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];

    switch (command) {
        case "echo":
            commandLibrary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            commandLibrary.cat(userInputArray.slice(1));
            break;
        case "head":
            commandLibrary.head(userInputArray.slice(1));
            break;
        case "tail":
            commandLibrary.tail(userInputArray.slice(1));
            break;
        default: errorHandler;
    }
}

const commandLibrary = {
    "echo": function (userInput) {
        done(userInput);
    },
    "cat": function (fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
        });
    },
    "head": function (fullPath) {
        const fileName = fullPath[0];
        const n = fullPath[1];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            let newArr = data.toString().split("\n");
            let nLines = newArr.slice(0, n).join("\n");
            done(nLines);
        });
    },
    "tail": function (fullPath) {
        const fileName = fullPath[0];
        const n = fullPath[1];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            let newArr = data.toString().split("\n");
            let nLines = newArr.slice(-n).join("\n");
            done(nLines);
        });
    }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;