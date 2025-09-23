import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/schemas/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'very_secret_example_change_me',
    });
  }

  async validate(payload: any) {
    // payload contains { sub: userId, email }
    const user = await this.usersService.findById(payload.sub);
    return user ? { id: user._id, email: user.email } : null;
  }
}
