const net = require("net");
const parseMessage = require("./parser");
const commands = require("./commands/received-commands");

function processMessage(data) {
  let parsedMessage = parseMessage(data);
  let commandToExecute = commands[parsedMessage[0]?.value?.toLowerCase()];
  if (!commandToExecute) {
    throw new Error('MÉTODO NÃO IMPLEMENTADO');
  }
  return commandToExecute(parsedMessage);
}

const server = net.createServer((connection) => {
  connection.setEncoding("utf8");
  connection.on('data', (data) => { 
    console.log(data);
    const result = processMessage(data);
    connection.write(result);
  });
}); 

let port = 6379;
let indexPortConfig = process.argv.findIndex(arg => arg === '--port');
const portConfig = Number(process.argv[indexPortConfig + 1]);
if (indexPortConfig > -1 && portConfig) {
  port = portConfig;
}

server.listen(port, "127.0.0.1", () => console.log(`Program running on port ${port}`));

// console.log(processMessage('*2\r\n$4\r\ninfo\r\n$11\r\nreplication\r\n'));
