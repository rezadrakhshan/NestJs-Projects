import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Public } from 'src/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('send-code')
  async send_code(@Body('email') email: string) {
    return this.authService.sendCode(email);
  }
  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: RegisterDto): Promise<{ msg: string }> {
    return this.authService.register(data);
  }
  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: RegisterDto) {
    return this.authService.login(data);
  }
}
