require('./config/config');

const http = require('http');
const path = require('path');

const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT;
const publicPath = path.join(__dirname + '/../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//io.on listens to events
// connection is triggered when new user connects to the server
io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newMessage', {
  //   from: 'luciano@example.com',
  //   text: 'Hey, what is going on?',
  //   createdAt: 123
  // });

  socket.on('createMessage', (message) => {
    console.log('CreateMessage', message);
    io.emit('newMessage',{ //io.emit broadcast message
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
