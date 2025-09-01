import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/database/entity/blog.entity';
import { User } from 'src/database/entity/user.entity';
import { Repository } from 'typeorm';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private uploadService: UploadService,
  ) {}

  async createBlog(data: any, thumbnail: any, req: any) {
    const user = await this.userRepository.findOne({
      where: { id: req.user?.sub },
    });
    if (!user) throw new NotFoundException('User not found');
    if (!thumbnail) throw new BadRequestException('Thumbnail file is required');
    const file: any = await this.uploadService.uploadFile(thumbnail, 'blog');
    if (!file || !file.url) throw new BadRequestException('File upload failed');
    const finalUrl = file.url.replace(
      'https://storage.',
      'https://dimple.storage.',
    );
    const blog = this.blogRepository.create({
      ...data,
      author: user,
      thumbnail: finalUrl,
    });
    return await this.blogRepository.save(blog);
  }

  async getAllBlog() {
    const result = await this.blogRepository.find();
    return result;
  }

  async getSingleBlog(id) {
    const result = await this.blogRepository.findOne({
      where: { id: id },
    });
    if (!result) throw new NotFoundException('Blog does not exists');
    return result;
  }

  async getUserBlog(req) {
    const user = await this.userRepository.findOne({
      where: { id: req.user.sub },
    });
    if (!user) throw new NotFoundException('User does not exists');
    const result = await this.blogRepository.find({
      where: { author: { id: user.id } },
      relations: ['author'],
    });
    return result;
  }
}
