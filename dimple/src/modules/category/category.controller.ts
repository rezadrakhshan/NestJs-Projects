import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { createCategoryDto } from './dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createCategory(@Body() data: createCategoryDto) {
    return this.categoryService.createCategory(data);
  }
}
