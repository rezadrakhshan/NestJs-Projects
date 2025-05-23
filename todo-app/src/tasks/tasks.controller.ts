import { Controller, Get, Post, Body, Req, UsePipes } from '@nestjs/common';
import { TasksService } from './task.service';
import { Request } from 'express';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(@Req() req: Request) {
    return this.tasksService.findAll(req);
  }
  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Req() req, @Body() data: CreateTaskDto) {
    return this.tasksService.createTask(req, data);
  }
}
