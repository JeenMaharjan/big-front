
import React, { useContext, useEffect, useState } from "react";
import avatar from "./1.jpg"

const Chats = () => {

  return (
    <div className="chats">
     
        <div
          className="userChat"
          
        >
          <img className="img" src={avatar} alt="" />
          <div className="userChatInfo">
            <span style={{color : "black"}}>Emma</span>
            <p>hello</p>
          </div>
        </div>
   
    </div>
  );
};

export default Chats;