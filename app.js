const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(app)
const io = require('socket.io')(server, {cors: {origin: "*"}});

io.on('connection', (socket) => {
  socket.on('request', (msg) => {
    io.emit('response', msg);
  });
});

server.listen(3300, () => {
  console.log('listening on *:3300');
});

module.exports.universal = (event, context) => awsServerlessExpress.proxy(server, event, context);
