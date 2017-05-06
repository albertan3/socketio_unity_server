var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	//res.send('<h1>Hello World</h1>');
	res.sendFile(__dirname + '/public/index.html');

});

io.on('connection', function(socket){
//socket.broadcast.emit('hi');
  //Color
  socket.on('rgb', function(msg){
    //console.log('message: ' + msg);
    if(msg){
      console.log('rgb: (' + msg.r + "," + msg.g + "," + msg.b + ")");
    }
    io.emit('rgb',msg);
  });//rgb 

   socket.on('logintext', function(msg){
    //console.log('message: ' + msg);
    if(msg){
      console.log('logintext: (' + msg.logintext+")");
    }

    io.emit('logintext',msg);
  });//rgb 
  
});//connection


http.listen(PORT,function(){
	console.log('listening on *:'+ PORT);
});