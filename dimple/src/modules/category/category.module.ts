import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/database/entity/category.entity';
import { Blog } from 'src/database/entity/blog.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Blog])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
