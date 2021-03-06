//create object 'app'
var app = {
  server: 'https://api.parse.com/1/classes/messages',
  contentType: 'application/json',
  username: 'anonymous',
  text: 'Hi there!',
  roomname: 'lobby',
  friends: {}, //store friends
  messageID: 0,
  init: function() {
    app.$main = $('#main'),
    app.$message = $('#message'),
    app.$chats = $('#chats'),
    app.$roomSelect = $('#roomSelect'),
    app.$addroom = $('.addroom'),
    app.$send = $('#send'),
    app.$addfriend = $('.addfriend'),
    //listeners
    app.$main.on('click', '.username', app.addFriend);
    app.$send.on('submit', app.handleSubmit);
    app.$addroom.on('click', app.addRoom);
    $(document).delegate('.username', 'click', app.addFriend);
    //app.$roomSelect.on('change', app.addRoom);
    setInterval(app.fetch, 1000);
  },
};

//AJAX call - POST
app.send = function(data) {
  //clear field
  app.$message.val('');
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(data),
    contentType: app.contentType,
    success: function(data) {
      //fetch data
      app.fetch();
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
    url: app.server,
    type: 'GET',
    contentType: app.contentType,
    success: function(data) {
      console.log(data);
      var latestMessage = data.results[data.results.length - 1];
      if (latestMessage.objectId !== app.messageID) {
        app.messageID = latestMessage.objectId;
        // console.log(data);
        app.addMessage(data.results);
        console.log('chatterbox: message received!');
      }
      //need a conditional to test if same message is trying to post
    },
    error: function(data) {
      console.error('chatterbox: failed to receive message', data);
    }
  });
};

//clearMessages
app.clearMessages = function() {
  app.$chats.children().remove();
};

//addFriend
app.addFriend = function(event) {
  event.preventDefault();
  console.log('addFriend called');
  var username = $(event.currentTarget).attr('data-username');

  //add to friends object
  app.friends[username] = app.username;
};

//addMessage
app.addMessage = function(data) {
  if (!data.roomname) {
    data.roomname = app.roomname;
  }
  console.log(data.roomname);

  if (data.roomname === app.roomname) {
    //This will create a new div for each chat
    var $chat = $('<div class="chat"></div>');
    var $username = $('<span class="username"></span>');
    $chat.append($username.html('<a class="addfriend" href="#">' + data[0].username + '</a>' + ': ').attr('data-username', data[0].username).attr('data-roomname', data.roomname));
    if (app.friends[data[0].username]) {
      $username.addClass('friend');
    }

    var $message = $('<br><span></span>');
    $chat.append($message.text(data[0].text));

    //bold text for friends
    if (app.friends[app.username]) {
      $chat.css('font-weight', 600);
    } 
    //append to page
    app.$chats.append($chat);
  }
};

//handleSubmit
app.handleSubmit = function(event) {
  event.preventDefault();
  var message = {
    username: app.username,
    text: app.$message.val(),
    roomname: app.$roomname || 'lobby'
  };

  if (app.$message.val().length === 0) {
    return;
  } else {
    app.send(message);
  }
};

//addroom
app.addRoom = function(event, newRoom) {
  event.preventDefault();

  newRoom = $('#addrooms').val();
  // var $room = $('<li><a href="#"></a></li>').val(newRoom).text(newRoom);
  console.log(newRoom);

  var $room = $('<option></option>').val(newRoom).text(newRoom);

  //add to roomSelect div
  app.$roomSelect.append($room);
};

// YOUR CODE HERE:
$(document).ready(function() {
  app.init();
});



