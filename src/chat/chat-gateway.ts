// src/chat/chat.gateway.ts
import { Injectable } from '@nestjs/common';
import { MessageBody, WebSocketGateway, SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';

@WebSocketGateway(3500,{ cors: { origin: '*' } })
@Injectable()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly userService: UserService) {}

  private server: Server;

  afterInit(server: Server) {
    this.server = server;
  }

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    const userId = client.handshake.query.userId;
    if (userId) {
      // Mark the user as online
      await this.userService.setUserOnlineStatus(Number(userId), true);
      console.log(`User ${userId} connected`);
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId;
    if (userId) {
      // Mark the user as offline
      await this.userService.setUserOnlineStatus(Number(userId), false);
      console.log(`User ${userId} disconnected`);
    }
  }

  @SubscribeMessage('newMessage')
  async handleMessage(@MessageBody() data: { message: string; userId: string }, client: Socket) {
    // Broadcast message to all connected clients
    this.server.emit('message', { message: data.message, userId: data.userId });
  }
}
