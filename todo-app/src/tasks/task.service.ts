import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './schemas/tasks.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
  ) {}

  async findAll(req) {
    try {
      const tasks = await this.taskModel.find({ userID: req.sub });
      return {
        message: 'All task is here',
        data: tasks,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Server can not sent tasks',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
