const { PONG } = require("./return-commands");

function encodeResponse(response) {
    return `+${response}\r\n`;
}

function echo(params) {
    if (!Array.isArray(params) || params[0]?.value?.toLowerCase() !== 'echo' || !params[1]) {
        throw new Error('Comando ECHO não é válido');
    }
    return encodeResponse(params[1].value);
}

function ping(params) {
    if (!Array.isArray(params) || params[0]?.value?.toLowerCase() !== 'ping') {
        throw new Error('Comando PING não é válido');
    }
    return PONG;
}

const commands = {
    echo,
    ping,
}

module.exports = commands;