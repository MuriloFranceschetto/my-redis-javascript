const net = require("net");
const parseMessage = require("./parser");
const commands = require("./commands/received-commands");

function processMessage(data) {
  let parsedMessage = parseMessage(data);
  return commands[parsedMessage[0].value](parsedMessage);
}

const server = net.createServer((connection) => {
  connection.setEncoding("utf8");
  connection.on('data', (data) => {
    console.log(data);
    const result = processMessage(data);
    connection.write(result);
  });
}); 

server.listen(6379, "127.0.0.1");

// processMessage('*3\r\n$3\r\nGET\r\n$');
