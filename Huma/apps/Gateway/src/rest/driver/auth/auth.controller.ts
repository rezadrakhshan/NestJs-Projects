import { Controller, Post, Body } from '@nestjs/common';
import { DriverAuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { DriverSignUpDto } from 'src/dtos/driver.dto';

@Controller('Auth')
export class DriverAuthController {
  constructor(private readonly driverAuthService: DriverAuthService) {}

  @Post('singup')
  @ApiOperation({ summary: 'Register a new driver account' })
  async signUp(Body: DriverSignUpDto) {
    return await this.driverAuthService.signUp(Body);
  }
}
