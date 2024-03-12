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

server.listen(6379, "127.0.0.1");

// console.log(processMessage('*5\r\n$3\r\nset\r\n$5\r\ngrape\r\n$4\r\npear\r\n$2\r\npx\r\n$4\r\n3000\r\n'));
// console.log(processMessage('*2\r\n$3\r\nget\r\n$5\r\ngrape\r\n'));
// setTimeout(() => {
//   console.log(processMessage('*2\r\n$3\r\nget\r\n$5\r\ngrape\r\n'));
// }, 4000)
