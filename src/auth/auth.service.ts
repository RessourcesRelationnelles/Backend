// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user && await bcryptjs.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  generateToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
  
    return this.jwtService.sign(payload);
  }  

  async register(data: Partial<User>) {
    if (!data.password) {
      throw new Error('Password is required');
    }

    const existingUser = await this.userRepo.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error('Email already exists');
    }
  
    const hashed = await bcryptjs.hash(data.password, 10);
    const user = this.userRepo.create({ ...data, password: hashed });
    const savedUser = await this.userRepo.save(user);
  
    const access_token = this.generateToken(savedUser);
  
    return { access_token };
  }  
}
