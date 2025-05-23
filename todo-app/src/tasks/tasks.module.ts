import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TasksController } from './tasks.controller';
import { TasksService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, taskSchema } from './schemas/tasks.schema';
import { AuthGuard } from 'src/auth/auth.guard';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: taskSchema }]),
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class TasksModule {}
