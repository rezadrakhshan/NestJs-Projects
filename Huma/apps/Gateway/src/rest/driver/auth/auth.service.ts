import { Injectable } from '@nestjs/common';
import { DriverRequestOtpDto } from 'src/dtos/driver.dto';
import { handleSrcCliResponse } from 'src/response/http-exception.filter';
import { MainServiceClient } from 'src/services/main.service';

@Injectable()
export class DriverAuthService {
  constructor(private readonly mainSrcCli: MainServiceClient) {}

  async requestOtp(body: DriverRequestOtpDto) {
    const data = await this.mainSrcCli.callAction({
      provider: 'DRIVERS',
      action: 'requestOtp',
      query: body,
    });
    return handleSrcCliResponse(data)
  }
}
