import { Injectable } from '@nestjs/common';

@Injectable()
export class DriverService {
  async signUp() {
    return 'welcome from main';
  }
}
