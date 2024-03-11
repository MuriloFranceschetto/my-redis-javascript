const fs = require('fs');
const path = require('path');

const { PONG } = require("./return-commands");

const PATH_FILE_JSON = path.join("data.json");

function encodeSimpleString(response) {
    return `+${response}\r\n`;
}

function encodeBulkedString(response) {
    return `$${response.length}\r\n${response}\r\n`;
}

function echo(params) {
    if (!Array.isArray(params) || params[0]?.value?.toLowerCase() !== 'echo' || !params[1]) {
        throw new Error('Comando ECHO não é válido');
    }
    return encodeSimpleString(params[1].value);
}

function ping(params) {
    if (!Array.isArray(params) || params[0]?.value?.toLowerCase() !== 'ping') {
        throw new Error('Comando PING não é válido');
    }
    return encodeSimpleString('PONG');
}

function set(params) {
    if (!Array.isArray(params) || params[0]?.value?.toLowerCase() !== 'set' || !params[1]?.value || !params[2]?.value) {
        throw new Error('Comando SET não é válido');
    }
    
    if (!fs.existsSync(PATH_FILE_JSON)) {
        fs.writeFileSync(PATH_FILE_JSON, '{}');
    }

    let jsonData = JSON.parse(fs.readFileSync(PATH_FILE_JSON));

    const key = params[1].value;
    const value = params[2].value;
    jsonData[key] = value;

    fs.writeFileSync(PATH_FILE_JSON, JSON.stringify(jsonData));

    return encodeSimpleString('OK');
}

function get(params) {
    if (!Array.isArray(params) || params[0]?.value?.toLowerCase() !== 'get' || !params[1]?.value) {
        throw new Error('Comando GET não é válido');
    }
    let jsonData = JSON.parse(fs.readFileSync(PATH_FILE_JSON));

    const key = params[1].value;
    return encodeBulkedString(jsonData[key]);
}

const commands = {
    echo,
    ping,
    get,
    set,
}

module.exports = commands;