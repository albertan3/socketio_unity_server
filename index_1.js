var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000;


var getUserMedia = require('getusermedia');

getUserMedia({ video: true, audio: false }, function (err, stream) {
  if (err) return console.error(err);

  var Peer = require('simple-peer');
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  });

  peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data);
  });

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value);
    peer.signal(otherId);
  });

  document.getElementById('send').addEventListener('click', function () {
    var yourMessage = document.getElementById('yourMessage').value;
    peer.send(yourMessage);
  });

  peer.on('data', function (data) {
    document.getElementById('messages').textContent += data + '\n';
  });

  peer.on('stream', function (stream) {
    var video = document.createElement('video');
    document.body.appendChild(video);

    video.src = window.URL.createObjectURL(stream);
    video.play();
  });
});

//video

//static
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