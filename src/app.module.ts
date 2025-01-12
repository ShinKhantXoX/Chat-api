// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ChatGateway } from './chat/chat-gateway';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1', // Use 127.0.0.1 instead of localhost
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'chatdb',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}
