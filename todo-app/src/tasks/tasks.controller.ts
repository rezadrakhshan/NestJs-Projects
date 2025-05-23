import { Controller, Get, Req } from '@nestjs/common';
import { TasksService } from './task.service';
import { Request } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(@Req() req: Request) {
    return this.tasksService.findAll(req);
  }
}
