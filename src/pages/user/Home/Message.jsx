import React, { useContext, useEffect, useRef } from "react";
import Cam from "./1.jpg";



const Message = ({ message }) => {



  return (
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
  );
};

export default Message;