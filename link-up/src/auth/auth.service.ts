import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService { 
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {} 

  async register(data: RegisterDto): Promise<{ msg: string }> {
    const user = await this.userRepository.findOne({
      where: [{username:data.username},{email:data.email}],
    });
    if (user) throw new ConflictException('Username or email already taken');
    const saltOrRounds = 16;
    const hash = await bcrypt.hash(data.password, saltOrRounds);
    await this.userRepository.save({ username: data.username, password: hash });
    return { msg: 'User created pleas login. ' };
  }

  async login(data: RegisterDto) {
    const user = await this.userRepository.findOne({
      where: [{username:data.username},{email:data.email}],
    });
    if (!user) throw new NotFoundException('Invalid username or password');
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new NotFoundException('Invalid username or password');
    const payload = { sub: user.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
