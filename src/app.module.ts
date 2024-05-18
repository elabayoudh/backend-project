
import { FolderModule } from './modules/Folders/folder.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from './modules/files/files.module';
//import { MessagesController } from './modules/messages/controller/message.controller';
import { MessagesModule } from './modules/messages/message.module';
import { NotificationModule } from './modules/Notifications/notification.module';
import { UsersModule } from './modules/users/users.module';
import { PublicationModule } from './modules/Publication/publication.module';
import { ChatsModule } from './modules/chats/chat.module';
import { CorsModule } from './cors.module';




@Module({
  imports: [ 
        FolderModule, 
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@dataroomdatabase.pjtfqzu.mongodb.net/?retryWrites=true&w=majority`,
    ),
    AuthModule,
    MessagesModule , 
    NotificationModule,
    UsersModule , 
    PublicationModule ,
    FilesModule,
    ChatsModule , 
    FolderModule,
    CorsModule ,
    

  ],
  


})
export class AppModule {}
