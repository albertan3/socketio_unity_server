var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')().listen(server);

io.on("connection", function(socket){
    console.log("A new client has connected with the id " + socket.id + "!");
    
    socket.on("disconnect", function(){
        console.log("the client has disconnected!");
    });
    
    socket.on("Message", function(data){
        console.log(data.message);
        
        io.emit("Message", data)
        
    });
    
    socket.on("Private Message", function(data){
        console.log(data);
        
        io.emit(data.chatID, data)
        
    });
    
  
    
    socket.on('typing', function(data){
        io.emit(data.chatID+'-typing', data);
    });
    
    socket.on('stop typing', function(data){
        io.emit(data.chatID+'-stop typing', data);
    });
})

var PORT = process.env.PORT || 3000;
server.listen(PORT, function(){
    console.log("Listening on PORT " + process.env.PORT);
})
 
 /*
var PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var IP = process.env.OPENSHIFT_NODEJS_IP;
server.listen(PORT,IP, function(){
    console.log("Listening on PORT " + PORT);
});*/