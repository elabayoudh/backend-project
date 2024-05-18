
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from '../events/events.module';
import { MessagesController } from './controller/message.controller';
import { MessagesService } from './services/message.service';
import { Chat, ChatSchema } from '../chats/schemas/chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema } // Ajoutez ChatModel ici
    ]) , 
    EventsModule
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
