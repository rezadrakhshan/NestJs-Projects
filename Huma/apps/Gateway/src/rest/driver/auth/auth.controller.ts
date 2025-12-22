import { Controller, Post, Body } from '@nestjs/common';
import { DriverAuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { DriverRequestOtpDto } from 'src/dtos/driver.dto';

@Controller('Auth')
export class DriverAuthController {
  constructor(private readonly driverAuthService: DriverAuthService) {}

  @Post('request-otp')
  @ApiOperation({ summary: 'Request otp in app by phone number' })
  async requestOtp(@Body() body: DriverRequestOtpDto) {
    return await this.driverAuthService.requestOtp(body);
  }
}
