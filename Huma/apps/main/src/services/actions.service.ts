import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DriverService } from 'providers/driver.service';

@Injectable()
export class SlefActionService {
  constructor(private readonly driverService: DriverService) {}

  async findAndCall(data) {
    const providerName = data.provider || null;
    const actionName = data.action || null;

    if (!providerName || !actionName) {
      throw new Error('err_service_noActionOrProvider');
    }

    let provider: any;
    switch (providerName) {
      case 'DRIVERS':
        provider = this.driverService;
        break;
      default:
        provider = null;
    }

    if (!provider || !provider[actionName]) {
      throw new Error('err_service_actionNotFound');
    }
    const response = await provider[actionName]();
    return {
      messsage: response.messsage ?? 'Ok',
      data: response.data ?? response,
    };
  }
}
