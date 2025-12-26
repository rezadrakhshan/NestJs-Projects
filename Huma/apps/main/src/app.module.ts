import { Module } from '@nestjs/common';
import { ServiceModule } from './services/service.module';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './config/configuration';
import { DatabasesModule } from './databases/databases.module';
import { UtilsModule } from 'utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configurations,
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabasesModule,
    UtilsModule,
    ServiceModule,
  ],
})
export class AppModule {}
