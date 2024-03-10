const net = require("net");
const commands = require('./commands');

const server = net.createServer((connection) => {
  connection.setEncoding("utf8");
  connection.on('data', () => {
    connection.write(commands.PONG);
  });
});

server.listen(6379, "127.0.0.1");
