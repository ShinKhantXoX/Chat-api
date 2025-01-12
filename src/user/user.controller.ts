import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Create a guard to protect routes

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // Register a new user
  @Post('register')
  async registerUser(@Body() body: { username: string; email: string; password: string }) {
    const { username, email, password } = body;
    return this.userService.createUser(username, email, password);
  }

  // Login user and return JWT token
  @Post('login')
  async loginUser(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const user = await this.authService.validateUser(username, password);
    if (user) {
      return this.authService.login(user); // Return JWT token
    }
    throw new Error('Invalid credentials');
  }

  // Example of a protected route
  @UseGuards(JwtAuthGuard) // Protect this route with JWT guard
  @Post('profile')
  getProfile(@Body() user: any) {
    return { message: 'This is your profile', user };
  }
}
