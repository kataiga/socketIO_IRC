const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const { dice, test, nick, notFound, changeRoom } = require("./commands")

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(cors())

io.on("connection", (socket) => {
	socket.on('join', ({ name, room }, callback) => {

		const { error, user } = addUser(
			{ id: socket.id, name, room });

		if (error) return callback(error);

		// Emit will send message to the user
		// who had joined
		socket.emit('message', { user: 'admin', text:
			`${user.name},
			welcome to room ${user.room}.` });

		// Broadcast will send message to everyone
		// in the room except the joined user
		socket.broadcast.to(user.room)
			.emit('message', { user: "admin",
			text: `${user.name}, has joined` });

		socket.join(user.room);

		io.to(user.room).emit('roomData', {
			room: user.room,
			users: getUsersInRoom(user.room)
		});
		callback();
	})

	socket.on('sendMessage', (message, callback) => {

		const user = getUser(socket.id);
		io.to(user.room).emit('message',
			{ user: user.name, text: message });

		io.to(user.room).emit('roomData', {
			room: user.room,
			users: getUsersInRoom(user.room)
		});
		callback();
	})

	socket.on('disconnect', () => {
		const user = removeUser(socket.id);
		if (user) {
			io.to(user.room).emit('message',
			{ user: 'admin', text:
			`${user.name} had left` });
		}
	})

	socket.on('sendCommand', (command, callback) => {
		const user = getUser(socket.id)

		let param = command.split(" ")[1]
		command = command.split(" ")[0]
		let message
		let changeRooms = false

		switch (command) {
			case '/test':
				func = "test"
			  	console.log('test command send')
			  	break
			case '/nick':
				func = "nick"
				message = nick(user, param)
				console.log("nick command send")
				break
			case '/dice':
				func = "dice"
				message = dice()
			  	console.log('dice command send')
			  	break;
			case '/room':
				console.log("changeroom asked")
				message = changeRoom(user, param)
				changRooms = true
				break
			default:
				func = "notfound"
				message = notFound()
			  console.log(`command not found`)
			  break
		}

		// message = func()

		if(changRooms == true){
			socket.emit('message', { user: "Admin", text: message, changeRooms: true, newRoom: user.room[1]})
		} else {
			socket.emit('message', { user: "Admin", text: message})	
		}
		
		callback()
		changRoom = false
	})

})

server.listen(6697,
	() => console.log(`Server has started.`));
