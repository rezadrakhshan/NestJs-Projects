import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from 'src/database/entity/product-category.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async createCategory(
    data: Partial<ProductCategory>,
  ): Promise<ProductCategory> {
    const category = this.productCategoryRepository.create(data);
    return await this.productCategoryRepository.save(category);
  }

  async updateCategory(
    id,
    data: Partial<ProductCategory>,
  ): Promise<ProductCategory> {
    const target: any = await this.productCategoryRepository.findOne({
      where: { id: id },
    });
    if (!target)
      throw new NotFoundException(`Category with id ${id} not found!`);
    target.title = data.title;
    return this.productCategoryRepository.save(target);
  }

  async removeCategory(id): Promise<{ message: string; id: any }> {
    const target: any = await this.productCategoryRepository.findOne({
      where: { id: id },
    });
    if (!target)
      throw new NotFoundException(`Category with id ${id} not found!`);

    await this.productCategoryRepository.remove(target);
    return { message: 'Category deleted successfully.', id: target.id };
  }

async getAllCategory(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.find();
}
}
