import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Post } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadService } from 'src/upload/upload.service';
import { pick } from 'lodash';
import mongoose from 'mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private readonly uploadService: UploadService,
  ) {}

  async createPost(data, req, files) {
    const value: any = pick(data, ['content']);
    value.userID = req.user.sub;
    const uploadResults = await Promise.all(
      files.map((file) => this.uploadService.uploadFile(file, 'posts')),
    );

    value.imagesUrl = uploadResults.map((result) => result.url);
    const result = await new this.postModel(value);
    await result.save();

    return result;
  }

  async removePost(id: string, req) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadGatewayException('Invalid ID');
    const post: any = await this.postModel.findOne({
      _id: id,
      userID: req.user.sub,
    });
    if (!post) throw new NotFoundException('Post does not exists');
    for (const url of post.imagesUrl) await this.uploadService.deleteFile(url);
    await this.postModel.findByIdAndDelete(id);
    return { msg: 'Post deleted succesfully' };
  }
}
