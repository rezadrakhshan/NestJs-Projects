import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/database/entity/product.entity';
import { ProductCategory } from 'src/database/entity/product-category.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCategory]), UploadModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
