import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendCodeDto } from './dto/sendCode.dto';
import { ConfirmCodeDto } from './dto/confirmCode.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('send-code')
  @UsePipes(new ValidationPipe())
  async sendCode(@Body() data: SendCodeDto) {
    return this.authService.sendCode(data);
  }

  @Post('confirm-code')
  @UsePipes(new ValidationPipe())
  async confirmCode(@Body() data: ConfirmCodeDto) {
    return this.authService.confirmCode(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data)
  }
}
