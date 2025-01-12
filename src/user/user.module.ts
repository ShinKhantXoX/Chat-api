// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller'; // If you have a controller

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Register the User entity here
  providers: [UserService],
  controllers: [UserController],  // If you have a controller
  exports: [UserService],  // Export UserService if you need it in other modules
})
export class UserModule {}
