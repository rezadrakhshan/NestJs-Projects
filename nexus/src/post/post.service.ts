import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus
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
    try {      
      const value: any = pick(data, ['content']);
      value.userID = req.user.sub;
      const uploadResults = await Promise.all(
        files.map((file) => this.uploadService.uploadFile(file, 'posts')),
      );
  
      value.imagesUrl = uploadResults.map((result) => result.url);
      const result = await new this.postModel(value);
      await result.save();
  
      return result;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Create post failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removePost(id: string, req): Promise<{ msg: string }> {
    try {   
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
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Remove post failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllPost() {
    try {
      const data = await this.postModel.find();
      return data;    
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Operation failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserPosts(req) {
    try {  
      const data = await this.postModel.find({ userID: req.user.sub });
      return data;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Operation failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async postDetail(id) {
    try { 
      if (!mongoose.Types.ObjectId.isValid(id))
        throw new BadRequestException('Invalid Id');
      const target = await this.postModel
        .findById(id)
        .populate('userID', 'username firstName lastName');
      if (!target) throw new NotFoundException('Post does not exists');
      return target;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Post detail operation failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePost(data, id, req, files) {
    try {     
      if (!mongoose.Types.ObjectId.isValid(id))
        throw new BadRequestException('Invalid ID');
  
      const value: any = pick(data, ['content']);
      const target = await this.postModel.findOne({
        _id: id,
        userID: req.user.sub,
      });
      if (!target) throw new NotFoundException('Post does not exists');
      if (Array.isArray(files) && files.length > 0) {
        for (const image of target.imagesUrl)
          await this.uploadService.deleteFile(image);
  
        const uploadResults = await Promise.all(
          files.map((file) => this.uploadService.uploadFile(file, 'posts')),
        );
  
        value.imagesUrl = uploadResults.map((result) => result.url);
      }
      const result = await this.postModel.findByIdAndUpdate(id, value, {
        new: true,
      });
      return result;
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Update post operation failed.',
          error: error?.message || 'Unknown error occurred.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
