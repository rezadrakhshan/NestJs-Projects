import { Injectable } from '@nestjs/common';
import { DriverSignUpDto } from 'src/dtos/driver.dto';
import { MainServiceClient } from 'src/services/main.service';

@Injectable()
export class DriverAuthService {
  constructor(private readonly mainSrcCli: MainServiceClient) {}

  async signUp(body: DriverSignUpDto) {
    const data = await this.mainSrcCli.callAction({
      provider: 'DRIVERS',
      action: 'signUp',
      query: body,
    });
    return data;
  }
}
