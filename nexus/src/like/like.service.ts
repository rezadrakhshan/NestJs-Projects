import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid ID');
    const target = await this.postModel.findById(id);
    if (!target) throw new NotFoundException('Post does not exists');
    const result = await new this.likeModel({
      postID: id,
      userID: req.user.sub,
    }).populate('postID', 'username firstName lastName');
    await result.save();
    return result;
  }
  async disLikePost(req, id) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid ID');
    const result = await this.likeModel.findOneAndDelete({
      postID: id,
      userID: req.user.sub,
    });
    return result;
  }
}
