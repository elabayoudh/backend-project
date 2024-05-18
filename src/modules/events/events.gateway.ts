import {
    SubscribeMessage,
    OnGatewayConnection,
    MessageBody,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayDisconnect,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { Injectable, Logger, UseGuards } from '@nestjs/common';
  import { ServerToClientMessages } from './types/events';
  import { WsJwtGuard } from '../auth/config/guard/ws-jwt.guard';
import { Chat } from '../chats/schemas/chat.schema';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  @UseGuards(WsJwtGuard) // Applying the WebSocket JWT Guard globally to this gateway
  @Injectable()
  export class EventsGateway
   implements OnGatewayConnection, OnGatewayDisconnect 
   {
    constructor() {}
  
    @WebSocketServer()
    server: Server<any, ServerToClientMessages>; // WebSocket server instance
  
    // afterInit(client: Socket) {
    //   client.use(SocketAuthMiddleware() as any); // Adding authentication middleware to the client socket
    //   Logger.log('afterInit');
    // }
  
    @SubscribeMessage('create_message') // Event listener for 'create_message' event
    handleSendMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: any): string {
      return 'Message received'; // Handling the 'create_message' event, returning acknowledgment message
    }
  
    // createMessage(message: Message) {
    //   this.server.emit('newMessage', message); // Broadcasting 'newMessage' event to all clients
    // }

    createMessage(chat: Chat) {
      // Émettre l'événement pour chaque message dans le chat
      chat.messages.forEach(message => {
        this.server.emit('newMessage', message);
      });
    }
  
    handleDisconnect(client: Socket) {
      Logger.log(`Client disconnected: ${client.id}`);
      // Handling client disconnection
    }
  
    async handleConnection(client: Socket, ...args: any[]) {
      Logger.log(`Client connected: ${client.id}`);
      // Handling client connection
    }
  }
  