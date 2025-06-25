import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
