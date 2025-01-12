import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'), // Secret key for JWT
    });
  }

  // Validate the JWT token and retrieve user details
  async validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}
