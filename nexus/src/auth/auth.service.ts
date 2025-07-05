import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { pick } from 'lodash';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(data): Promise<{ access_token: string }> {
    try {
      let value = pick(data, [
        'email',
        'username',
        'firstName',
        'lastName',
        'password',
      ]);
      const saltRounds = 10;
      let user = await this.userModel.findOne({
        $or: [{ email: value.email }, { username: value.username }],
      });
      if (user) {
        throw new BadRequestException('Email or username taken');
      }
      value.password = await bcrypt.hash(value.password, saltRounds);
      user = await new this.userModel(value);
      await user.save();
      const payload = { sub: user.id };
      return { access_token: await this.jwtService.signAsync(payload) };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Registration failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async login(data): Promise<{ access_token: string }> {
    try {
      const value = pick(data, ['email', 'username', 'password']);
      const user = await this.userModel.findOne({
        $or: [{ email: value.email }, { username: value.username }],
      });
      if (!user) {
        throw new UnauthorizedException('Invalid username or email');
      }
      const isMatch = await bcrypt.compare(value.password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Incorecct password');
      }
      const payload = { sub: user.id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Login failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
