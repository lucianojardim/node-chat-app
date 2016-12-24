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
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
})

socket.on('newLocationMessage', function(message){
  var li = jQuery('<li></li>');
  li.text(`${message.from}`);
  var a = jQuery(`<a></a>`);
  a.text('My current location');
  a.attr('target','_blank');
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', { //createMessage is a custom event
    from: 'client@example.com',
    text: jQuery('[name=message]').val()
  }, function() {
    //console.log('Got the ack', data);
  });
});

var locationButton = jQuery('#send-location'); //The button that sends locationButton
locationButton.on('click', function() {
  if (!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('Unable to fetch location')
  });
});
