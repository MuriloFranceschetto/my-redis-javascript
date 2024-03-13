const settings = require("./settings");

const expectedParams = [
    {key: '--port', valuesCountAfter: 1, action: (value) => {
        settings.changeInfo('port', value[0]);
    }},
    {key: '--replicaof', valuesCountAfter: 2, action: (value) => {
        settings.changeInfo('role', 'slave');
    }},
]

class RunnerArguments {

    constructor() {
        expectedParams.forEach(param => {
            let argumentIndex = process.argv.findIndex(arg => arg === param.key);
            if (argumentIndex > -1) {
                let value = process.argv.slice(++argumentIndex, argumentIndex + param.valuesCountAfter);
                this[param.key.substring(2, param.key.length)] = value;
                param.action(value);
            }
        });
    }

}

module.exports = new RunnerArguments();