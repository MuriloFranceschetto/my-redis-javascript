
function splitByCRLF(value) {
    return value.split('\r\n');
}

function encodeSimpleString(response) {
    return `+${response}\r\n`;
}

function encodeBulkedString(response) {
    return `$${response?.length ?? '-1'}\r\n${(response || response === 0 ? response + '\r\n' : '')}`;
}

module.exports = {
    splitByCRLF,
    encodeSimpleString,
    encodeBulkedString,
}