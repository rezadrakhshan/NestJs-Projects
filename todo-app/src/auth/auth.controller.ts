import { Controller, Post, UsePipes, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: AuthDto) {
    return this.authService.register(data);
  }

  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: AuthDto) {
    return this.authService.login(data);
  }
}
