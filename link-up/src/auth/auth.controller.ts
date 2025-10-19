import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: RegisterDto): Promise<{ msg: string }> {
    return this.authService.register(data);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: RegisterDto) {
    return this.authService.login(data);
  }
}
