import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Req,
  UsePipes,
  Param,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { Request } from 'express';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll(@Req() req: Request) {
    return this.tasksService.findAll(req);
  }
  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Req() req: Request, @Body() data: CreateTaskDto) {
    return this.tasksService.createTask(req, data);
  }
  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateTask(@Param('id') id: string, @Body() data: UpdateTaskDto) {
    return this.tasksService.updateTask(id, data);
  }
}
