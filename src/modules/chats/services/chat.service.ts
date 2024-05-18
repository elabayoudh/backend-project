// import { Injectable } from '@nestjs/common';
// import { ChatsRepository } from '../repository/chat.repository';
// import { CreateChatDto } from '../DTOS/chat.dtos';

// @Injectable()
// export class ChatsService {
//   constructor(private readonly chatsRepository: ChatsRepository) {}

//   async createChat(createChatDto: CreateChatDto) {
//     return await this.chatsRepository.createChat(createChatDto);
//   }

   
//   async findAllChats(id: string) {
//     return await this.chatsRepository.findAllChats(id);
//   }
// }
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from '../schemas/chat.schema';
import { Message } from '../schemas/chat.schema'; // Importez le schéma des messages
import { CreateChatDto } from '../DTOS/chat.dtos';

@Injectable()
export class ChatsService {
  server: any;
  constructor(@InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>) {}

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    const newChat = new this.chatModel({
      title: createChatDto.title,
      members: createChatDto.members,
      messages: [] // Initialisez les messages à un tableau vide
    });

    return await newChat.save();
  }

  async findAllChats(userId: string): Promise<Chat[]> {
    return await this.chatModel.find({ members: userId }).exec();
  }



}
