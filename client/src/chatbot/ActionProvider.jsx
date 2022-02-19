import React from "react";
import { getClinicas } from "../actions/index"
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    greet = () => {
      const message = this.createChatBotMessage("Hola Como estas?");
      this.addMessageToState(message);
    };
  
    handleEspecialidad = () => {
      const message = this.createChatBotMessage(
        "Muchas gracias por usar Clinno Bot!, para poder ver nuestras especialidades porfavor dirigase a la pagina principal y en el apartado Seleccione la especialidad deseada",
      );
  
      this.addMessageToState(message);
    };
    handleRegistrarse = () => {
      const message = this.createChatBotMessage(
        "Muchas gracias por usar Clinno Bot!, para poder registrarse busque en la barra de navegacion, el boton registrarse",    
      );
  
      this.addMessageToState(message);
    };
    handleTurno = () => {
      const message = this.createChatBotMessage(
        "Muchas gracias por usar Clinno Bot!, para poder sacar turno usted tiene que estar logueado anteriormente, una vez hecho esto usted debera seleccionar la especialidad deseada y la clinica disponible donde desea atenderse.",     
      );
  
      this.addMessageToState(message);
    };
    handleClinicas = () => {
      const message = this.createChatBotMessage(
        'Muchas gracias por usar Clinno Bot!, estas son algunas de las clinicas con las que contamos:  .',     
      );
  
      this.addMessageToState(message);
    };
    handleSoyClinica = () => {
      const message = this.createChatBotMessage(
        'Muchas gracias por usar Clinno Bot!, estas son algunas de las clinicas con las que contamos:  .',     
      );
  
      this.addMessageToState(message);
    };
    handleSoyClinica = () => {
      const message = this.createChatBotMessage(
        'Muchas gracias por usar Clinno Bot!, para registrar tu clinica en Clinno debes desplazarte hasta la parte superior de la pagina, donde podras encontrar la opcion SoyClinica .',     
      );
  
      this.addMessageToState(message);
  
    };
    addMessageToState = (message) => {
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    };
  }
  
  export default ActionProvider;
