'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const shortId 		= require('shortid');
const clients			= [];

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {

  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));


	var currentUser;

		socket.on('USER_CONNECT', function (){

			console.log('Users Connected ');
			for (var i = 0; i < clients.length; i++) {
				
				
				socket.emit('USER_CONNECTED',{

					name:clients[i].name,
					id:clients[i].id,
					position:clients[i].position

				});

				console.log('User name '+clients[i].name+' is connected..');

			};

		}); //user connect


		socket.on('PLAY', function (data){
		currentUser = {
			name:data.name,
			id:shortId.generate(),
			position:data.position
		}

		clients.push(currentUser);
		socket.emit('PLAY',currentUser );
		socket.broadcast.emit('USER_CONNECTED',currentUser);

	});//play


		socket.on('disconnect', function (){

		socket.broadcast.emit('USER_DISCONNECTED',currentUser);
		for (var i = 0; i < clients.length; i++) {
			if (clients[i].name === currentUser.name && clients[i].id === currentUser.id) {

				console.log("User "+clients[i].name+" id: "+clients[i].id+" has disconnected");
				clients.splice(i,1);

			};
		};

	});// disconect


		socket.on('MOVE', function (data){

		// currentUser.name = data.name;
		// currentUser.id   = data.id;
		currentUser.position = data.position;

		socket.broadcast.emit('MOVE', currentUser);
		console.log(currentUser.name+" Move to "+currentUser.position);


	}); //move
//setInterval(() => io.emit('time', new Date().toTimeString()+" :client: "+ clients.length), 1000);

});

setInterval(() => io.emit('time', new Date().toTimeString()+" :client: "+ clients.length), 1000);
