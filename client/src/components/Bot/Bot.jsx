import React from 'react'
import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css'
import { useState } from 'react';
import config from "./chatbot/config";
import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";
import './Bot.css'
function Bot() {
    const [showBot, toggleBot] = useState(false);

  return (
    <div style={{position: "fixed", zIndex: 99, left: 20, bottom:20}}>
    {showBot &&
    <Chatbot 
        config={config}
        messageParser={MessageParser}
        headerText='Muchas gracias por usar Clinno'
        placeholderText='Haga su consulta...'
        // messageHistory={loadMessages()}
        actionProvider={ActionProvider}
        // saveMessages={saveMessages}
    />
    } <button className="btn btn-info bot_chatBox" 
    onClick={() => toggleBot((prev) => !prev)}>
        <i className="fas fa-robot"></i> 
        <small> <strong>Soy Bot</strong>  
        <br/>¿Te puedo ayudar?
        </small> 
    </button>
  </div>
  )
}

export default Bot