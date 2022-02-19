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
        this.actionProvider.handleEspecialidad();
      }
      if (lowercase.includes("registrarme") || lowercase.includes("res")) {
        this.actionProvider.handleRegistrarse();
      }
      if (lowercase.includes("turno") || lowercase.includes("tur")) {
        this.actionProvider.handleTurno();
      }
      if (lowercase.includes("clinicas") || lowercase.includes("clinicas")) {
        this.actionProvider.handleClinicas();
      }
      if (lowercase.includes("soyclinica") || lowercase.includes("soyclinica")) {
        this.actionProvider.handleSoyClinica();
      }
    }
  }
  
  export default MessageParser;
  