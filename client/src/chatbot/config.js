import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "../components/Options/Options";
import Quiz from "../components/Quiz/Quiz";

const config = {
  botName: "Clinno bot",
  initialMessages: [
    createChatBotMessage(`Hola, gracias por usar Clinno, ¿en que lo podemos ayudar?`, {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "javascriptQuiz",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        questions: [
          {
            question: "Aqui puedes ver nuestras clinicas",
            answer: 
              "Clinica san andres",
            id: 1,
          }
        ],
      },
    },
    {
      widgetName: "register",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        questions: [
          {
            question: "Toca Aqui para Registrarte",
            answer: 
              "En instantes seras redireccionado",
            id: 2,
          }
        ],
      },
    },
    {
      widgetName: "turno",
      widgetFunc: (props) => <Quiz {...props} />,
      props: {
        questions: [
          {
            question: "Toca Aqui para sacar turno",
            answer: 
              "En instantes seras redireccionado",
            id: 3,
          }
        ],
      },
    },
  ],
};

export default config;
