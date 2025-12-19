import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { SlefActionService } from './actions.service';
import { DriverService } from 'providers/driver.service';

@Module({
  imports: [],
  controllers: [ServiceController],
  providers: [SlefActionService, DriverService],
})
export class ServiceModule {}
