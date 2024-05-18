import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventsGateway } from '@/modules/events/events.gateway';
import { CreateMessageDto } from '../DTOS/message.dto';
import { Chat, ChatDocument } from '@/modules/chats/schemas/chat.schema';

@Injectable()
export class MessagesService {
 
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>, // Injectez le modèle du chat
    private eventGateway: EventsGateway
  ) {}

  async createMessage(chatId: string, createMessageDto: CreateMessageDto): Promise<Chat> {
    const chat = await this.chatModel.findById(chatId); // Trouvez le chat par ID
// Vérifier si le chat existe
if (!chat) {
  throw new NotFoundException('Chat not found.');
}

// Vérifier si l'utilisateur est autorisé à envoyer un message dans ce chat
if (!chat.members.includes(createMessageDto.user_id)) {
  throw new UnauthorizedException('You are not authorized to send messages in this chat.');
}

    // Ajoutez le message au chat
    chat.messages.push({
      user_id : createMessageDto.user_id,
      user_name: createMessageDto.user_name,
      message: createMessageDto.message,
      createDate: new Date()
    });

    const updatedChat = await chat.save();
    this.eventGateway.createMessage(updatedChat); // Émettre un événement
    return updatedChat;
  }

  async findAllMessages(chatId: string): Promise<Chat> {
    return await this.chatModel.findById(chatId); // Récupérez le chat par ID pour obtenir tous les messages
  }
}



 // constructor(
  //   @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
  //   private eventGateway: EventsGateway) {}

  // async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
  //   const createdMessage = new this.messageModel({
  //     user_id: createMessageDto. user_id,
  //     message:createMessageDto.message ,
  //     chat_id : createMessageDto.chat_id , 
     
  //   });

  //   const result = await createdMessage.save();
  //   this.eventGateway.createMessage(result); // Emit event
  //   return result;
  // }
  // async findAllMessages(userId: string): Promise<Message[]> {
  //   return await this.messageModel.find({  user_id: userId }).exec();
  // }


