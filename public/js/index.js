var socket = io();

socket.on('connect', function () { //connect is a standard event
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'viviane@example.com',
  //   text: 'Message from client.'
  // })
});

socket.on('disconnect', function () { //disconnect is a standards event
  console.log('Disconnected from server');
})

socket.on('newMessage', function (message) { //newMessage is a custom event
  console.log('New message', message);
})

