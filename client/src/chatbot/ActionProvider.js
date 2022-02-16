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
        "Muchas gracias por usar Clinno!, para poder ver nuestras especialidades porfavor dirigase a la pagina principal, en el apartado Seleccione una especialidad",
      );
  
      this.addMessageToState(message);
    };
    handleRegistrarse = () => {
      const message = this.createChatBotMessage(
        "Muchas gracias por usar Clinno!, para poder registrarse busque en la barra de navegacion, el boton registrarse",    
      );
  
      this.addMessageToState(message);
    };
    handleTurno = () => {
      const message = this.createChatBotMessage(
        "Muchas gracias por usar Clinno!, para poder sacar turno usted tiene que estar logueado anteriormente, una vez hecho esto usted debera seleccionar una especialidad y una clinica donde atenderse.",     
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
  