class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      console.log(message);
      const lowercase = message.toLowerCase();
  
      if (lowercase.includes("hello")) {
        this.actionProvider.greet();
      }
  
      if (lowercase.includes("especialidades") || lowercase.includes("esp")) {
        this.actionProvider.handleJavascriptQuiz();
      }
      if (lowercase.includes("registrarme") || lowercase.includes("res")) {
        this.actionProvider.handleRegister();
      }
      if (lowercase.includes("turno") || lowercase.includes("tur")) {
        this.actionProvider.handleTurno();
      }
    }
  }
  
  export default MessageParser;
  