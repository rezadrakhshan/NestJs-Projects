import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendCodeDto } from './dto/sendCode.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('send-code')
  @UsePipes(new ValidationPipe())
  async sendCode(@Body() data: SendCodeDto) {
    return this.authService.sendCode(data);
  }
}
