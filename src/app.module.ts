import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';  // For resolving paths, if you store entities in a separate folder
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config accessible throughout the app
      envFilePath: '.env', // Specify the path to your .env file
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',  // Use environment variable or fallback
      port: parseInt(process.env.DB_PORT, 10) || 3306, // Use environment variable or fallback
      username: process.env.DB_USERNAME || 'root',  // Use environment variable or fallback
      password: process.env.DB_PASSWORD || 'password', // Use environment variable or fallback
      database: process.env.DB_NAME || 'chatdb',  // Use environment variable or fallback
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],  // Dynamically import entities
      synchronize: true, // Auto synchronize schema (use with caution in production)
    }),
    ChatModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
