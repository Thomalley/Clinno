import React from "react";

import "./Options.css";

const Options = (props) => {
  const options = [
    {
      text: "Ver Clinicas",
      handler: props.actionProvider.handleJavascriptQuiz,
      id: 1,
    },
    { text: "Registrarme", handler: props.actionProvider.handleRegistrarse, id: 2 },
    { text: "Sacar Turno", handler: props.actionProvider.handleTurno, id: 3 },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className="option-button">
      {option.text}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
