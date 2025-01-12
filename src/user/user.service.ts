// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(username: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    return this.userRepository.save(user);
  }

  // Find user by ID (fixed)
  async findUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });  // Correct usage of findOne
  }

  // Set the user as online or offline
  async setUserOnlineStatus(userId: number, isOnline: boolean): Promise<void> {
    await this.userRepository.update(userId, { isOnline });
  }
}
