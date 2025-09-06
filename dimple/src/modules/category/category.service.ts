import { ConflictException, Injectable } from '@nestjs/common';
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
}
