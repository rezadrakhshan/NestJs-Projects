import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/database/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async sendCode(to: string, type: string): Promise<{ status: boolean }> {
    switch (type) {
      case 'r':
        const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        await this.cacheManager.set(`${to}`, code);
        await this.mailerService.sendMail({
          to,
          subject: 'Register - Dimple',
          template: 'code',
          context: {
            code: code,
          },
        });
        return { status: true };

      case 'f':
        const user = await this.userRepository.findOne({
          where: { email: to },
        });
        if (!user) throw new NotFoundException('Invalid email');
        const forgotCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        await this.cacheManager.set(`${to}`, forgotCode);
        await this.mailerService.sendMail({
          to,
          subject: 'Forgot password - Dimple',
          template: 'code',
          context: {
            code: forgotCode,
          },
        });
        return { status: true };
      default:
        return { status: false };
    }
  }

  async register(data): Promise<{ status: boolean }> {
    const checkEmail = await this.userRepository.findOne({
      where: [{ email: data.email }, { phone: data.phone }],
    });
    if (checkEmail) throw new ConflictException('Email or Phone taken');
    const codeIsValid = await this.cacheManager.get(`${data.email}`);
    if (codeIsValid != data.code) throw new BadRequestException('Invalid code');
    await this.cacheManager.del(`${data.email}`);
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

  async forgotPassword(data): Promise<{ status: true }> {
    const target = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!target) throw new NotFoundException('User does not exists');
    const codeIsValid = await this.cacheManager.get(`${data.email}`);
    if (codeIsValid != data.code) throw new BadRequestException('Invalid code');
    await this.cacheManager.del(`${data.email}`);
    const saltRounds = 10;
    target.password = await bcrypt.hash(data.password, saltRounds);
    await this.userRepository.save(target);
    return { status: true };
  }
}
