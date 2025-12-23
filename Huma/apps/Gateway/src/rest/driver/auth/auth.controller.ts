import { Controller, Post, Body, UseFilters, UseInterceptors } from '@nestjs/common';
import { DriverAuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DriverRequestOtpDto } from 'src/dtos/driver.dto';
import { HttpExceptionFilter } from 'src/response/http-exception.filter';
import { ResponseInterceptor } from 'src/response/response-interceptors';


@ApiTags("Driver:Auth")
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
}
