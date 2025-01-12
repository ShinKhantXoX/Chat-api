import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {

    }

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

}
