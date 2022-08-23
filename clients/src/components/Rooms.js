import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components' 
import io from 'socket.io-client'



const Rooms = () => {

  // var socket = io.connect();
  // socket.emit('create', 'room1');

  const [roomName, setRoomName] = useState(""); 
  const socketRef = useRef();

  // useEffect(() => {
  //   socketRef.current = io.connect('/');
  //   //useEffect indique a React que le composant (la function) 
  //   //doit executer qlq chose apres chq affichage     
    

  //   socketRef.current.on("room", (message) => {
  //     // function receivedMessage defined below
  //     receivedMessage(message);
  //   })

  // }, []);

  // function presentRoom(e) {
  //   e.preventDefault();

    const roomObject = {
      roomName: "ROOM1"
    }
    // socketRef.current.emit("join-room", roomObject);

  // }
  return (
    <div>
      <p>Bonjour le rooms</p>
      <p>Room : {roomObject}</p>
    </div>

  );
};
  
export default Rooms;