import { BadRequestException, Injectable } from '@nestjs/common';
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
    if (!thumbnail) throw new BadRequestException('');
    if (!images) throw new BadRequestException('');

    data.thumbnail = (
      await this.uploadService.uploadFile(thumbnail, 'Product')
    ).url;

    const uploadResults = await Promise.all(
      images.map((file) => this.uploadService.uploadFile(file, 'Product')),
    );

    data.images = uploadResults.map((result) => result.url);

    const result = await this.productRepository.create(data)

    return await this.productRepository.save(result)
  }
}
