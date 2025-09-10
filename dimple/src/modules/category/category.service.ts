import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/database/entity/category.entity';
import { Blog } from 'src/database/entity/blog.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async createCategory(data) {
    const isExists = await this.categoryRepository.findOne({
      where: { title: data.title },
    });
    if (isExists)
      throw new ConflictException(
        `A category with the title "${data.title}" already exists.`,
      );
    return await this.categoryRepository.save(data);
  }

  async getAllCategory() {
    const categories = await this.categoryRepository.find();
    return {
      total: categories.length,
      data: categories,
    };
  }

  async updateCategory(data, id) {
    const target = await this.categoryRepository.findOne({ where: { id: id } });
    if (!target)
      throw new NotFoundException(`Category with id "${id}" does not exist.`);
    Object.assign(target, data);
    await this.categoryRepository.save(target);
    return target;
  }

  async removeCategory(id) {
    const target = await this.categoryRepository.findOne({ where: { id: id } });
    if (!target)
      throw new NotFoundException(`Category with id "${id}" does not exist.`);
    await this.categoryRepository.remove(target);
    return target;
  }

  async filterCategory(title: string) {
    const category = await this.categoryRepository.findOne({
      where: { title },
    });
    if (!category) {
      throw new NotFoundException(`Category with title "${title}" does not exist.`);
    }
    const [blogs, count] = await this.blogRepository.findAndCount({
      where: { category: { title } },
    });
    return {
      category: {
        id: category.id,
        title: category.title,
      },
      totalBlogs: count,
      blogs,
    };
  }
}
