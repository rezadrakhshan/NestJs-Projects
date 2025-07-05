import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotAcceptableException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Comment } from './schemas/comment.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { pick } from 'lodash';
import { Post } from 'src/post/schemas/post.schema';
import mongoose from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async getAllCommentOfPost(postID) {
    try {  
      if (!mongoose.Types.ObjectId.isValid(postID)) {
        throw new BadRequestException('Invalid postID');
      }
      const post = await this.postModel.findOne({ _id: postID });
      if (!post) {
        throw new NotFoundException('Post does not exists');
      }
      const result = await this.commentModel.find({ postID: postID });
      return result;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Opration failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createComment(data, req) {
    try {     
      const value: any = pick(data, ['content', 'postID', 'parentID']);
      value.userID = req.user.sub;
      const postTarget = await this.postModel.findOne({ _id: value.postID });
      if (!postTarget) {
        throw new BadRequestException('Invalid postID');
      }
      if (value.parentID) {
        const parentTarget = await this.commentModel.findOne({
          _id: value.parentID,
        });
        if (!parentTarget) {
          throw new BadRequestException('Invalid parentID');
        }
      }
      const result = await new this.commentModel(value);
      await result.save();
      return result;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Create COmment failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateComment(id, data, req) {
    try {
      const value = pick(data, ['content']);
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ID');
      }
      const comment = await this.commentModel.findById(id);
      if (!comment) {
        throw new NotFoundException('Comment does not exists');
      }
      if (comment.userID != req.user.sub) {
        throw new NotAcceptableException('Access denied');
      }
      comment.content = value.content;
      await comment.save();
      return comment;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Update comment failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteComment(id, req) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ID');
      }
      const comment = await this.commentModel.findById(id);
      if (!comment) {
        throw new NotFoundException('Comment does not exists');
      }
      if (comment.userID != req.user.sub) {
        throw new NotAcceptableException('Access denied');
      }
      await this.commentModel.findByIdAndDelete(id);
      return { msg: 'Comment was removed' };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Delete comment failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
