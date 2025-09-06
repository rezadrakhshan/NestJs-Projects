import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/database/entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
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
}
