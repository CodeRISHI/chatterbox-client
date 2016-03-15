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
app.send = function() {
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

//handleSubmit
app.handleSubmit = function() {
  console.log('TEST');
  $('#send .submit').submit(function() {
    app.send();
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

//addFriend
app.addFriend = function() {
  $('.friendsList').append('<a href="#"> ' + message.username + '</a>');
};

//addMessage
app.addMessage = function(newMessage) {
  $('#chats').append('<a href="#" class="username"> ' + JSON.stringify(newMessage.username) + '</a>');
  $('#chats .username').click(function() {
    app.addFriend();
  });
};

//addroom
app.addRoom = function(newRoom) {
  $('#roomSelect').append('<li> ' + newRoom + '</li>');
};

