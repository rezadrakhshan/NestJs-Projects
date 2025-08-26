import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.sto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot.dto';
import { Public } from 'src/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('send-code/:to/:type')
  async sendCode(@Param('to') to: string, @Param('type') type: string) {
    return this.authService.sendCode(to, type);
  }

  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }

  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Public()
  @Post('forgot-password')
  @UsePipes(new ValidationPipe())
  async forgotPassword(@Body() data: ForgotPasswordDto) {
    return this.authService.forgotPassword(data);
  }
}
