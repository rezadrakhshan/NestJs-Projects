import { Injectable } from '@nestjs/common';
import { DriverSignUpDto } from 'src/dtos/driver.dto';

@Injectable()
export class DriverAuthService {
  async signUp(body: DriverSignUpDto) {
    return 'Welcome';
  }
}
