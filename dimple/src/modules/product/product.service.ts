import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/database/entity/product.entity';
import { ProductCategory } from 'src/database/entity/product-category.entity';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly productCategopryRepository: Repository<ProductCategory>,
    private readonly uploadService: UploadService,
  ) {}

  async createProduct(data, thumbnail, images) {
    if (!thumbnail)
      throw new BadRequestException('Thumbnail image is required.');
    if (!images) throw new BadRequestException('Product images are required.');

    data.thumbnail = (
      await this.uploadService.uploadFile(thumbnail, 'Product')
    ).url;

    const uploadResults = await Promise.all(
      images.map((file) => this.uploadService.uploadFile(file, 'Product')),
    );

    data.images = uploadResults.map((result) => result.url);

    const result = await this.productRepository.create(data);

    return await this.productRepository.save(result);
  }

  async getAllProduct() {
    return await this.productRepository.find({
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }

  async getProductDetail(id) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }
    return {
      message: 'Product retrieved successfully.',
      data: product,
    };
  }

  async removeProduct(id) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found.`);
    }
    await this.productRepository.remove(product);
    return {
      message: 'Product removed successfully.',
      data: product,
    };
  }
}
