import {
  BadRequestException,
  Injectable,
  NotFoundException,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from './schemas/like.schema';
import { Post } from 'src/post/schemas/post.schema';
import mongoose from 'mongoose';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name) private likeModel: mongoose.Model<Like>,
    @InjectModel(Post.name) private postModel: mongoose.Model<Post>,
  ) {}

  async likePost(req, id) {
    try {    
      if (!mongoose.Types.ObjectId.isValid(id))
        throw new BadRequestException('Invalid ID');
      const target = await this.postModel.findById(id);
      if (!target) throw new NotFoundException('Post does not exists');
      const result = await new this.likeModel({
        postID: id,
        userID: req.user.sub,
      });
      await this.postModel.findByIdAndUpdate(id, {
        $inc: { likeCount: 1 },
      });
      await result.save();
      return result;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Like operation failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async disLikePost(req, id) {
    try {   
      if (!mongoose.Types.ObjectId.isValid(id))
        throw new BadRequestException('Invalid ID');
      await this.postModel.findByIdAndUpdate(id, {
        $inc: { likeCount: -1 },
      });
      const result = await this.likeModel.findOneAndDelete({
        postID: id,
        userID: req.user.sub,
      });
      return result;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'disLike operation failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
