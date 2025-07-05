import {
  BadRequestException,
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Follow } from './schemas/follow.schema';
import { User } from 'src/auth/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow.name) private followModel: Model<Follow>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async followUser(id, req) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid userID');
      }
      const following = await this.userModel.findById(id);
      if (!following) {
        throw new NotFoundException('User does not exists');
      }
      const newFollow = await new this.followModel({
        follower: req.user.sub,
        following: id,
      });
      await newFollow.save();
      return newFollow;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Follow operation failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async unFollowUser(id, req) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid userID');
      }
      const following = await this.userModel.findById(id);
      if (!following) {
        throw new NotFoundException('User does not exists');
      }
      const newFollow = await this.followModel.deleteOne({
        follower: req.user.sub,
        following: id,
      });
      return newFollow;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Unfollow operation failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
