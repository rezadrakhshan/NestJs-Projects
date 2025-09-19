import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from 'src/database/entity/product-category.entity';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
