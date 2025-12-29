import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { DriverAuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DriverRequestOtpDto,
  DriverVerifyOtpInputDto,
} from 'src/dtos/driver.dto';
import { HttpExceptionFilter } from 'src/response/http-exception.filter';
import { ResponseInterceptor } from 'src/response/response-interceptors';
import { Response } from 'express';

@ApiTags('Driver:Auth')
@Controller('Auth')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class DriverAuthController {
  constructor(private readonly driverAuthService: DriverAuthService) {}

  @Post('request-otp')
  @ApiOperation({ summary: 'Request otp in app by phone number' })
  async requestOtp(@Body() body: DriverRequestOtpDto) {
    return await this.driverAuthService.requestOtp(body);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify otp sent to driver phone number' })
  async verifyOtp(
    @Body() body: DriverVerifyOtpInputDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.driverAuthService.verifyOtp(body);
    console.log(result)
    const tokenData = result.access_token;
    res.cookie(tokenData.name, tokenData.token, {
      maxAge: tokenData.ttl,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    delete result.access_token;
    return result;
  }
}
