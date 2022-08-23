import React, {useEffect, useState} from 'react'
import queryString from "query-string";
import io from 'socket.io-client';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import ChatList from '../ChatList/ChatList';
import { useNavigate } from 'react-router-dom';
import "./Chat.css";

var connectionOptions = {
	"force new connection" : true,
	"timeout" : 10000,				
	"transports" : ["websocket"]
};

var socket = io.connect('http://localhost:5000',connectionOptions);

const Chat = ({location}) => {

	const [name, setName] = useState('');
	const [room, setRoom] = useState("");
	const [rooms, setRooms] = useState([])
	const [users, setUsers] = useState('');
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [command, setCommand] = useState(false)

	const ENDPOINT = 'localhost:6697';
	let navigate = useNavigate();

	useEffect( () => {
		const {name, room} = queryString.parse(window.location.search);

		setName(name);
		setRoom(room);


		socket.emit('join',{name, room}, (error) => {
			if(error) {
				alert(error);
			}
		})
		return () => {
			socket.emit('disconnect');
			socket.off();
		}
		
	},[ENDPOINT, window.location.search]);

	useEffect( () => {
		socket.on('message', (message, changrooms, newRoom) => {
			setMessages([...messages,message]);
			if(changrooms == true){
				console.log('ca marhce presque')
				navigate('chat?name='+ name + '&room=' + newRoom);
			};
		});

		socket.on("roomData", ({ users }) => {
			setUsers(users);
		});


	},[messages, users]);

	//Function for Sending Message
	const sendMessage = (e) => {
		e.preventDefault();
		if(message) {
			socket.emit('sendMessage', message, () => setMessage(''))
		}
	}

	const sendCommand = (e) => {
		e.preventDefault();
		if(message) {
			socket.emit('sendCommand', message, () => setMessage(''))
		}
	}

	//function too check for command
	const checkMessage = (e) => {
		setMessage(e)
		if(message[0] == "/"){
			setCommand(true)
		} else {
			setCommand(false)
		}
	}

	const beforeSend = (e) => {
		if(command){
			sendCommand(e)
		} else {
			sendMessage(e)
		}
	}

	console.log(message ,messages);

	return (
		<div className="outerContainer">
			<div className="container">
		
				<InfoBar room={room} />
				<div>
					<Messages messages={messages} name={name} />
					<Input message={message} setMessage={setMessage}
					beforeSend={beforeSend} checkMessage={checkMessage}/>
				</div>
			</div>
			<TextContainer users={users}/>
		</div>
	)
};

export default Chat;
