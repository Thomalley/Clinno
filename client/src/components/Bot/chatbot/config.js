
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "Clinno bot",
  initialMessages: [
    createChatBotMessage(`Hola, gracias por usar Clinno, si usted tiene alguna inquietud, porfavor escriba alguna de estas palabras: Especialidad, Turno, Registrarme, Clinicas, SoyClinica`, {
    }),
  ],
  
};

export default config;