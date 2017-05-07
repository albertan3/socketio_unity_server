var getUserMedia = require('getusermedia');
var socket = io();
var secondSend =false;
//bundle it http://browserify.org/#install  browserify video_control.js -o bundle.js
var firstUserRTC_data ="";


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

    if(secondSend==true){

      socket.emit('sent_second_recieving', {'sent_second_recieving': JSON.stringify(data)});

    }else{

      socket.emit('sent_init_signal', {'sent_init_signal': JSON.stringify(data)});
    }

          console.log("sent_init_signal: ");
  });

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value);
    peer.signal(otherId);
    secondSend =true;
  //  socket.emit('sent_second_recieving', {'sent_second_recieving': JSON.stringify(data)});
    console.log("sent_second_recieving: bundle ");

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
