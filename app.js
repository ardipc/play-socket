const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const http = require('http').Server(app);
const io = require('socket.io')(http, {cors: {origin: "*"}});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('request', (msg) => {
    io.emit('response', msg);
  });
});

http.listen(3300, () => {
  console.log('listening on *:3300');
});
