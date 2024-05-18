// import { Message } from "@/modules/messages/schema/message.schema";

// export interface ServerToClientMessages {
//     newMessage : (payload :Message) => void ; 
// }


import { Chat } from '../../chats/schemas/chat.schema'; // Importez le schéma de chat

export interface ServerToClientMessages {
  newMessage: (payload: Chat["messages"][0]) => void; // Utilisez la structure du message dans le schéma du chat
}
