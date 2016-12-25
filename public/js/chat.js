var socket = io();

function scrollToBottom() { //call this function every time a new message is added to the screen
  //Selectors //From jQuery (DOM)
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights //From jQuery (DOM)
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop'); 
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () { //connect is a standard event
  console.log('Connected to server');
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
  scrollToBottom();

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
  scrollToBottom();

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
  e.preventDefault(); // prevent default of reloading the page and create a variable in the URL for the form variable

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
