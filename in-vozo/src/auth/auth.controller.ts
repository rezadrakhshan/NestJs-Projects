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
import { Public } from '@app/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('send-code')
  @UsePipes(new ValidationPipe())
  async sendCode(@Body() data: SendCodeDto) {
    return this.authService.sendCode(data);
  }

  @Public()
  @Post('confirm-code')
  @UsePipes(new ValidationPipe())
  async confirmCode(@Body() data: ConfirmCodeDto) {
    return this.authService.confirmCode(data);
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
  async login(@Body() data: RegisterDto) {
    return this.authService.login(data);
  }
}
