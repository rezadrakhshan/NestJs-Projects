import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './schemas/tasks.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { pick } from 'lodash';
import { CreateTaskdata } from 'src/tasks/interfaces/create-task-data.interface';
import { UpdateTask } from './interfaces/update-tas.interface';
import { error } from 'console';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async findAll(req) {
    try {
      const tasks = await this.taskModel.find({ userID: req.user.sub });
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
  async createTask(req, data) {
    try {
      const value: CreateTaskdata = pick(data, ['text']);
      value.userID = req.user.sub;
      const newTask = await new this.taskModel(value);
      return await newTask.save();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Server cant create task',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  async updateTask(id, data) {
    try {
      const value: UpdateTask = pick(data, ['text', 'isCompleted']);
      const target = await this.taskModel.findByIdAndUpdate(id, value, {
        new: true,
      });
      if (!target) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Task does not exists',
          },
          HttpStatus.NOT_FOUND,
          {
            cause: error,
          },
        );
      }
      return target;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Server cant create task',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  async removeTask(id) {
    try {
      const target = await this.taskModel.findByIdAndDelete(id, { new: true });
      if (!target) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Task does not exists',
          },
          HttpStatus.NOT_FOUND,
          {
            cause: error,
          },
        );
      }
      return { message: 'Task was remove' };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Server cant create task',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
