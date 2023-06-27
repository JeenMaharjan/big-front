import React, { useContext, useEffect, useState } from "react";
import Cam from "./1.jpg"
import Messages from "./Messages";
import Input from "./Input";
import { useSelector } from "react-redux";
import { createMessage, getMessage  } from "../../../functions/messenger";


const Chat = () => {
  const { user, conversation } = useSelector((state) => ({ ...state }));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  console.log(conversation._id);

  useEffect(() => {
    loadMessages();
  }, [conversation]);

  const loadMessages = async () => {
    try {
      const response = await getMessage(conversation._id, user.token);
      setMessages(response.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to load messages");
    }
  };
  console.log(messages)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: conversation._id,
    };

    try {
      const response = await createMessage(message, user.token);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
      setError("Failed to send message");
    }
  };
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>martha</span>
        <div className="chatIcons">
         
        </div>
      </div>
      
       <div className="messages">
      
       
        <div
     
      className={`message`}
    >
      <div className="messageInfo">
        <img
          src={Cam}
          alt=""
        />
        <span style={{color:"black"}}>just now</span>
      </div>
      <div className="messageContent">
        <p>hello</p>  
        <img src={Cam} alt="" />
      </div>
    </div>
      
    </div>
      
      <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <div className="send">
        {/* <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label> */}
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
    </div>
  );
};

export default Chat;