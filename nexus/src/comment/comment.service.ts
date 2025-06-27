import { BadRequestException, Injectable } from '@nestjs/common';
import { Comment } from './schemas/comment.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { pick } from 'lodash';
import { Post } from 'src/post/schemas/post.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}
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
}
