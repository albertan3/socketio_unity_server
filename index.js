var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000;
var firstUserRTC_data ="";
var secUserRTC_data ="";

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	//res.send('<h1>Hello World</h1>');
	res.sendFile(__dirname + '/public/index.html');

});

// usernames which are currently connected to the chat
var usernames = {};
var availUsers ={"first_user":"avail", "sec_user":"avail"};

io.on('connection', function(socket){
//socket.broadcast.emit('hi');
  //Color
  socket.on('sent_init_signal', function(msg){
		firstUserRTC_data = msg.sent_init_signal;
    //console.log('message: ' + msg);
    if(msg){
    //  console.log('sent_init_signal: (' + msg.sent_init_signal + ")");
    }
    io.emit('sent_init_signal',msg);
  });//rgb\
//get first user data to auto fill
		socket.on('get_firstUserRTC_data', function(msg){

       io.emit('get_firstUserRTC_data', firstUserRTC_data);


		});


   socket.on('sent_second_recieving', function(msg){
    //console.log('message: ' + msg);
    if(msg){

      console.log('sent_second_recieving: (' + msg+")");
    }
     secUserRTC_data = msg.sent_second_recieving;
    io.emit('sent_second_recieving',msg);
  });//second


	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		console.log("username: "+username);
		// we store the username in the socket session for this client
		socket.username = username;
		// add the client's username to the global list
		usernames[username] = username;
		// echo to client they've connected
		socket.emit('updatechat', 'SERVER', 'you have connected');
		// echo globally (all clients) that a person has connected
		socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');

	});

	socket.on('get_avail_username', function(msg){
	 //console.log('message: ' + msg);
	 if(msg){

		 console.log('get_avail_username: (' + msg+")");
	 }

	 if(availUsers["first_user"]=="avail"){
        myuser_id="first_user";
        availUsers["first_user"]="false";
     socket.emit('adduser', "first_user");

     console.log("myuser_id:"+myuser_id);

   }else if(availUsers["sec_user"]=="avail"){

     myuser_id="sec_user";
     availUsers["sec_user"]="false";
   socket.emit('adduser', "sec_user");
   console.log("myuser_id:"+myuser_id);
   }else{
         myuser_id ="morethan3";
   socket.emit('adduser', "morethan3");
   console.log("myuser_id:"+myuser_id);

   }

	 //io.emit('sent_second_recieving',msg);
	});//second


});//connection


http.listen(PORT,function(){
	console.log('listening on *:'+ PORT);
});
