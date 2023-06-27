import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from "socket.io-client";
import Sidebar from './Sidebar.jsx';
import Chat from './Chat.jsx';
import Cam from "./1.jpg";
import { createMessage, getMessage } from "../../../functions/messenger";
import "./home.css";
import { findOne, getUsers } from '../../../functions/user.js';
import { format } from "timeago.js";
import Search from './Search.jsx';

const Home = () => {
  const [users, setUsers] = useState([]);
  const socketRef = useRef(null);
  const { user, conversation } = useSelector((state) => ({ ...state }));
  const [receiver, setReceiver] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [error, setError] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://localhost:9000");

    // Clean up the socket connection on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    getUsers(user.token).then((res) => setUsers(res.data));
  };

  useEffect(() => {
    loadMessages();
  }, [conversation]);

  const loadMessages = async () => {
    try {
      const response = await getMessage(conversation._id, user.token);
      setMessages(response);
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to load messages");
    }
  };

  useEffect(() => {
    socketRef.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socketRef.current.emit("addUser", user._id);
    socketRef.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, []);
const receiverId = conversation?.members?.find(
      (member) => member !== user._id
    );
  useEffect(() => {
    if (conversation) {
      findOne(receiverId, user.token).then((res) => setReceiver(res));
    }
  }, [conversation]);

  useEffect(() => {
    arrivalMessage &&
      conversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, conversation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: conversation._id,
    };

    const receiverId = conversation.members.find(
      (member) => member !== user._id
    ).toString();
        
    socketRef.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const response = await createMessage(message, user.token);
      console.log(response);
      setMessages([...messages, response.data]);
      loadMessages();
      setNewMessage("");
    } catch (error) {
      console.log(error);
      setError("Failed to send message");
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className='home'>
      <div className="conty">
        <div className="sidebar">
          <div className='navbar'>
            <span className="logo">Welcome to Chat</span>
          </div>
          <Search users={users} />
        </div>
        <div className="chat" >
          <div className="chatInfo">
            <span>{receiver[0]?.name}</span>
            <div className="chatIcons"></div>
          </div>
          <div className="messages">
            {messages?.map((m) => {
              const own = m?.sender === user._id;
              return (
                <div key={m?._id} ref={scrollRef}>
                  <div className={own ? "message own" : "message"}>
                    <div className="messageInfo">
                      <span style={{ color: "black" }}>{format(m?.createdAt)}</span>
                    </div>
                    <div className="messageContent">
                      <p>{m?.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Type something..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="send">
              <button onClick={handleSubmit}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
