import { Controller, HttpStatus } from '@nestjs/common';
import { SlefActionService } from './actions.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ServiceController {
  constructor(private readonly actions: SlefActionService) {}

  @MessagePattern('callAction')
  async callTestMessage(data) {
    try {
      const res = await this.actions.findAndCall(data);
      return {
        context: data,
        status: 'SUCCEED',
        code: 200,
        message: res.messsage || 'Ok',
        error: null,
        data: res.data || null,
      };
    } catch (error) {
      return {
        context: data,
        status: 'FAILED',
        code: error.code || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.msg || null,
        error: error.message || 'err_service_notHandledError',
        data: null,
      };
    }
  }
}
