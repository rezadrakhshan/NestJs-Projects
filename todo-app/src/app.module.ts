import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    AuthModule,
    TasksModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env['DATABASE_URL'],
      }),
    }),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
