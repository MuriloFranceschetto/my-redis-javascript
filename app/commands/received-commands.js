const fs = require('fs');
const path = require('path');

const KeyValueInfo = require('../keyValueInfo');
const { encodeSimpleString, encodeBulkedString } = require('../utils');

const PATH_FILE_JSON = path.join("data.json");

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
    if (!Array.isArray(params) || params.length < 3) {
        throw new Error('Comando SET deve ser um array');
    }
    if (params.splice(0, 1)[0]?.value?.toLowerCase() !== 'set') {
        throw new Error('Comando SET não implementado');
    }
    
    if (!fs.existsSync(PATH_FILE_JSON)) {
        fs.writeFileSync(PATH_FILE_JSON, '{}');
    }

    let fileData = JSON.parse(fs.readFileSync(PATH_FILE_JSON));

    const key = params.splice(0, 1)[0].value;
    const value = params.splice(0, 1)[0].value;

    let keyValueInfo = new KeyValueInfo(key, value);

    let indexExpireTimeConfig = params.findIndex(param => param?.value?.toLowerCase() === 'px');
    if (indexExpireTimeConfig > -1) {
        let [, milliseconds] = params.splice(indexExpireTimeConfig, 2);
        keyValueInfo.setExpireTimeout(milliseconds.value);
    }

    fileData[keyValueInfo.key] = keyValueInfo;

    fs.writeFileSync(PATH_FILE_JSON, JSON.stringify(fileData));

    return encodeSimpleString('OK');
}

function get(params) {
    if (!Array.isArray(params) || params[0]?.value?.toLowerCase() !== 'get' || !params[1]?.value) {
        throw new Error('Comando GET não é válido');
    }
    let fileData = JSON.parse(fs.readFileSync(PATH_FILE_JSON));

    let jsonData = fileData[params[1].value];
    let keyValueInfo = new KeyValueInfo(jsonData.key, jsonData.value, jsonData.timeToExpire);

    let updatedValue = keyValueInfo.getValue();
    if (updatedValue === undefined) {
        delete fileData[keyValueInfo.key];
        fs.writeFileSync(PATH_FILE_JSON, JSON.stringify(fileData));
    }

    return encodeBulkedString(updatedValue);
}

function info(data) {
    const settings = require('../settings/settings');
    return settings.getInfo();
}

const commands = {
    echo,
    ping,
    get,
    set,
    info,
}

module.exports = commands;