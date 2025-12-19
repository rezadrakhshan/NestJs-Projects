import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Main',
        transport: Transport.TCP,
      },
    ]),
  ],
})
export class ServiceModule {}
