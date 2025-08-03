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
  async sendCode(@Body() data: SendCodeDto): Promise<{ status: string }> {
    return this.authService.sendCode(data);
  }

  @Public()
  @Post('confirm-code')
  @UsePipes(new ValidationPipe())
  async confirmCode(
    @Body() data: ConfirmCodeDto,
  ): Promise<{ status: boolean }> {
    return this.authService.confirmCode(data);
  }

  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() data: RegisterDto): Promise<{ status: Boolean }> {
    return this.authService.register(data);
  }

  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: RegisterDto): Promise<{ access_token: string }> {
    return this.authService.login(data);
  }
}
