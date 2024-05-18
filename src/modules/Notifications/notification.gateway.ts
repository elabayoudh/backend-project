import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './Dtos/create-notification.dto';

@WebSocketGateway()
@Injectable()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor() {}

  @WebSocketServer() server: Server;

  // @SubscribeMessage('createNotification')
  // handleSendMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: any): string {
  //   return 'notification received'; 

  // }
  
  @SubscribeMessage('createNotification')
handleSendMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: CreateNotificationDto): string {
  // Emit the newNotification event to all connected clients
  this.server.emit("newNotification", payload);

  // Return a success message
  return 'notification received';
}

  createNotification(notification: Notification){
    this.server.emit("newNotification", notification);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
 
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }


}
