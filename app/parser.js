function splitByCRLF(value) {
    return value.split('\r\n');
}

// Bulk strings - Starts with $ - https://redis.io/docs/reference/protocol-spec/#bulk-strings
function parseBulkStrings(value) {
    response = {
        length: null,
        value: null,
    };
    const firstParamMatch = value.match(RegExp(/^\$([0-9])+/));
    if (!firstParamMatch) {
        throw new Error('Formatação inválida');
    }
    let splitedMessage = splitByCRLF(value);
    response.length = parseInt(firstParamMatch[1], 10);
    if (splitedMessage[1].length !== response.length) {
        throw new Error('PALAVRA NÂO DA BOA');
    }
    response.value = splitedMessage[1];
    return response;
}

function parseArray(value) {
    const firstParamMatch = value.match(RegExp(/^\*([0-9])+/));
    if (!firstParamMatch) {
        throw new Error('Formatação inválida');
    }
    const arrLength = parseInt(firstParamMatch[1], 10);
    
    let commands = value.match(RegExp(/\$([0-9]+)(\r\n)(\w+)(\r\n)/g));

    if (arrLength !== commands.length) {
        throw new Error('TAMANHO DO ARRAY INVALIDO');
    }

    return commands.map(comm => parseFunctions[comm[0]](comm));
}

const parseFunctions = {
    '$': parseBulkStrings,
    '*': parseArray,
}

function parseMessage(message) {
    const firstChar = message[0];
    return parseFunctions[firstChar](message);
}

module.exports = parseMessage;