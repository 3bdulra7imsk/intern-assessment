import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/schemas/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signup(email: string, password: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new Error('User exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(email, hashed);
    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload); // expiresIn set in module -> 8h
    return { user: { id: user._id, email: user.email }, token };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (match) return { id: user._id, email: user.email };
    return null;
  }

  async login(email: string, pass: string) {
    const valid = await this.validateUser(email, pass);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: valid.id, email: valid.email };
    return { token: this.jwtService.sign(payload), user: valid };
  }
}
