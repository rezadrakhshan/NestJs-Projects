import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { pick } from 'lodash';
import { AuthData } from './interfaces/login.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private JwtService: JwtService,
  ) {}
  async register(data): Promise<User> {
    let value: AuthData = pick(data, ['username', 'password']);
    let user = await this.userModel.findOne({ username: value.username });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const saltRounds = 10;
    value.password = await bcrypt.hash(value.password, saltRounds);
    user = new this.userModel(value);
    return await user.save();
  }
  async login(data): Promise<{ access_token: string }> {
    const value: AuthData = pick(data, ['username', 'password']);
    const target = await this.userModel.findOne({ username: value.username });
    if (!target) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(value.password, target.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: target.id };
    return {
      access_token: await this.JwtService.signAsync(payload),
    };
  }
}
