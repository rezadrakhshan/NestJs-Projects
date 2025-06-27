import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotAcceptableException,
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
    if (!mongoose.Types.ObjectId.isValid(postID)) {
      throw new BadRequestException('Invalid postID');
    }
    const post = await this.postModel.findOne({ _id: postID });
    if (!post) {
      throw new NotFoundException('Post does not exists');
    }
    const result = await this.commentModel.find({ postID: postID });
    return result;
  }

  async createComment(data, req) {
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
  }

  async updateComment(id, data, req) {
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
  }
}
