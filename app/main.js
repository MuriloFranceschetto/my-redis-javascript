const net = require("net");
const parseMessage = require("./parser");
const commands = require("./commands/received-commands");

const server = net.createServer((connection) => {
  connection.setEncoding("utf8");
  connection.on('data', (data) => {
    let parsedMessage = parseMessage(data);
    let result = commands[parsedMessage[0].value](parsedMessage);
    connection.write(result);
  });
}); 

server.listen(6379, "127.0.0.1");