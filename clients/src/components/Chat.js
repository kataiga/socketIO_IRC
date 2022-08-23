import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components' 
import io from 'socket.io-client'

const Page = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  flex-direction: column;
  background-color: grey;
  `;
  /* background-image: url(${'https://i0.wp.com/wallonica.org/wp-content/uploads/2018/01/the-darknet_1200xx2713-1531-0-10.jpg?resize=840%2C474'}); */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 500px;
  overflow: auto;
  width: 400px;
  border: 1px solid white;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
`;

const TextArea = styled.textarea`
  width: 98%;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 1px solid white;
  outline: none;
  color: white;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
`;

const Button = styled.button`
  background-color: pink;
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: #46516e;
  font-size: 17px;
`;

const Form = styled.form`
  width: 600px;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  width: 55%;
  background-color: pink;
  color: #46516e;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-top-right-radius: 10%;
  border-bottom-right-radius: 10%;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  width: 55%;
  background-color: navy;
  color: lightgray;
  border: 1px solid navy;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
`;

const Chat = () => {
  const [yourID, setYourId] = useState();
  //useState pour ajouter l'etat local React a des fonctions composants
  //plus besoin d'utiliser this.state
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef();
  // console.log(socketRef);
  //useRef est comme une boite qui contient une valeur modifiable 
  //dans sa propriete .current 
  

  useEffect(() => {
    socketRef.current = io.connect('/');
    //useEffect indique a React que le composant (la function) 
    //doit executer qlq chose apres chq affichage     
    socketRef.current.on("your id", id => {
      setYourId(id);
      //ici on demande au serveur de se rappeler de nous
    })

    socketRef.current.on("message", (message) => {
      // function receivedMessage defined below
      receivedMessage(message);
    })

  }, []);

  function receivedMessage(message) {
    setMessages(oldMessages => [...oldMessages, message]);
    //permet de cumuler et d'afficher les anciens msg au lieu de les remplacer directement par les nouveaux 
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      bodyMessage: message,
      id: yourID,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
    // console.log(messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <Page>
      <Container>
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <MyRow key={index}>
                <MyMessage>
                  My MSG : {message.bodyMessage}
                </MyMessage>
              </MyRow>
            )
          }
          return (
            <PartnerRow key={index}>
              <PartnerMessage>
                Partner MSG : {message.bodyMessage}
              </PartnerMessage>
            </PartnerRow>
          )
        })}
      </Container>
      <Form onSubmit={sendMessage}>
        <TextArea value={message} onChange={handleChange} placeholder="Say something..." />
        <Button>Send</Button>
      </Form>
    </Page>
  );
};

export default Chat;