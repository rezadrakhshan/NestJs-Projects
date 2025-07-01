import { Injectable } from '@nestjs/common';
import { Post } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UploadService } from 'src/upload/upload.service';
import { pick } from 'lodash';

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
    await result.save()

    return result
  }
}
