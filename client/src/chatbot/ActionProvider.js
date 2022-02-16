class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    greet = () => {
      const message = this.createChatBotMessage("Hello friend.");
      this.addMessageToState(message);
    };
  
    handleJavascriptQuiz = () => {
      const message = this.createChatBotMessage(
        "Muchas gracias por usar Clinno!",
        {
          widget: "javascriptQuiz",
        }
      );
  
      this.addMessageToState(message);
    };
    handleRegistrarse = () => {
      const message = this.createChatBotMessage(
        "Muchas gracias por usar Clinno!",
      {
        widget: "register"
      }      
      );
  
      this.addMessageToState(message);
    };
    handleTurno = () => {
      const message = this.createChatBotMessage(
        "Muchas gracias por usar Clinno!",
      {
        widget: "turno"
      }      
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
  