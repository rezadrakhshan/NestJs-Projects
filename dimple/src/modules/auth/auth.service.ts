import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async sendCode(to: string) {
    const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to NestJS',
      template: 'code',
      context: {
        code: code,
      },
    });
  }

  async register(data): Promise<{ status: boolean }> {
    const checkEmail = await this.userRepository.findOne({
      where: [{ email: data.email }, { phone: data.phone }],
    });
    if (checkEmail) throw new ConflictException('Email or Phone taken');
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);
    await this.userRepository.save(data);
    return { status: true };
  }

  async login(data): Promise<{ access_token: string }> {
    const checkUser = await this.userRepository.findOne({
      where: [{ email: data.email }, { phone: data.phone }],
    });
    if (!checkUser) throw new UnauthorizedException('Invalid data');
    const isMath = await bcrypt.compare(data.password, checkUser.password);
    if (!isMath) throw new UnauthorizedException('Invalid data');
    const payload = { sub: checkUser.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
