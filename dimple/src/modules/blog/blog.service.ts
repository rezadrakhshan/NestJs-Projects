import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/database/entity/blog.entity';
import { User } from 'src/database/entity/user.entity';
import { Category } from 'src/database/entity/category.entity';
import { Like, Repository } from 'typeorm';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private uploadService: UploadService,
  ) {}

  async createBlog(data: any, thumbnail: any, req: any) {
    const user = await this.userRepository.findOne({
      where: { id: req.user?.sub },
    });
    if (!user) throw new NotFoundException('User not found');
    const category = await this.categoryRepository.findOne({
      where: { id: data.categoryID },
    });
    if (!category) throw new NotFoundException('Invalid Category ID');
    if (!thumbnail) throw new BadRequestException('Thumbnail file is required');
    const file: any = await this.uploadService.uploadFile(thumbnail, 'blog');
    if (!file || !file.url) throw new BadRequestException('File upload failed');
    const finalUrl = file.url.replace(
      'https://storage.',
      'https://dimple.storage.',
    );
    const blog = this.blogRepository.create({
      title: data.title,
      content: data.content,
      category: category,
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

  async updateBlog(data, id, req, thumbnail) {
    const target = await this.blogRepository.findOne({
      where: { id: id, author: { id: req.user.sub } },
    });

    if (!target) throw new NotFoundException('Blog does not exists');

    if (thumbnail) {
      if (target.thumbnail) {
        await this.uploadService.deleteFile(target.thumbnail);
      }

      const file: any = await this.uploadService.uploadFile(thumbnail, 'blog');
      if (!file || !file.url) {
        throw new BadRequestException('File upload failed');
      }

      data.thumbnail = file.url.replace(
        'https://storage.',
        'https://dimple.storage.',
      );
    }

    if (data.categoryID) {
      const category = await this.categoryRepository.findOne({
        where: { id: data.categoryID },
      });
      if (!category) throw new NotFoundException('Invalid Category ID');
      data.category = category;
    }

    Object.assign(target, data);
    await this.blogRepository.save(target);

    return target;
  }

  async deleteBlog(req, id) {
    const target = await this.blogRepository.findOne({
      where: {
        id,
        author: { id: req.user.sub },
      },
      relations: ['author'],
    });
    if (!target) throw new NotFoundException('Blog does not exists');
    await this.uploadService.deleteFile(target.thumbnail);
    await this.blogRepository.remove(target);
    return target;
  }

  async searchBlog(title, content) {
    return this.blogRepository.find({
      where: [{ title: Like(`%${title}%`) }, { content: Like(`%${content}%`) }],
    });
  }
}
