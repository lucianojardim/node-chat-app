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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

  // var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);
})

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: `);
  // var a = jQuery(`<a></a>`);
  // a.text('My current location');
  // a.attr('target','_blank');
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', { //createMessage is a custom event
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val(''); //clears the box
    //console.log('Got the ack', data);
  });
});

var locationButton = jQuery('#send-location'); //The button that sends locationButton
locationButton.on('click', function() {
  if (!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled','disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    //console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location')
  });
});
