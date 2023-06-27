import React from 'react'
import { format } from "timeago.js";

function Messagess({ m, own }) {
  return (
    <>
          
          <div
     
      className={own ? "message" : "message own"}
    >
      <div className="messageInfo">
        
        <span style={{color:"black"}}>{format(m?.createdAt)}</span>
      </div>
      <div className="messageContent">
        <p>{m?.text}</p>  
        
      </div>
    </div>
          </>
  )
}

export default Messagess