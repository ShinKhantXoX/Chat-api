// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';  // Import AuthModule to access JwtService

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],  // Import AuthModule here
  providers: [UserService],  // Only provide UserService here
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
