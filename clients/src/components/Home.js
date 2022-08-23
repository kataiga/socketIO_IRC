import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components' 
import io from 'socket.io-client'
import { Link, BrowserRouter, Route } from 'react-router-dom';

const Home = () => {
    
    return (
    <div>
        <p>Bonjour le accueil</p>
        <ul>
            <li>
              <Link to="/rooms">Rooms</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
          </ul>

    </div>

      // <Page>
      //   <Form>
      //     <p>Choose Room</p>
      //   </Form>
      // </Page>
    );
  };
  
  export default Home;