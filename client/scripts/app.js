// YOUR CODE HERE:

//create object 'app'
var app = {
  init: function() {
    console.log('hello guys!');
  },
  url: 'https://api.parse.com/1/classes/messages',
  contentType: 'application/json'
};

var message = {
  username: 'Mel Brooks',
  text: 'It\'s good to be the king',
  roomname: 'lobby'
};

//AJAX call - POST
app.send = function(data) {
  $.ajax({
    type: 'POST',
    data: JSON.stringify(message),
    success: function(data) {
      console.log('chatterbox: message sent!');
    },
    error: function(data) {
      console.error('chatterbox: failed to send message', data);
    }
  });
};

//AJAX call - GET
app.fetch = function() {
  $.ajax({
    type: 'GET',
    data: JSON.stringify(message),
    success: function(data) {
      console.log('chatterbox: message received!');
    },
    error: function(data) {
      console.error('chatterbox: failed to receive message', data);
    }
  });
};

//clearMessages
app.clearMessages = function() {
  $('#chats').children().remove();
};

//addMessage
app.addMessage = function(newMessage) {
  $('#chats').append('<span> ' + newMessage + '</span>');
};

//addroom
app.addRoom = function(newRoom) {
  $('#roomSelect').append('<li> ' + newRoom + '</li>');
};


