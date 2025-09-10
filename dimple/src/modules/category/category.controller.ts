import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { createCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createCategory(@Body() data: createCategoryDto) {
    return this.categoryService.createCategory(data);
  }
  @Get()
  async getAllCategory() {
    return this.categoryService.getAllCategory();
  }
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateCategory(
    @Body() data: UpdateCategoryDto,
    @Param('id') id: string,
  ) {
    return this.categoryService.updateCategory(data, id);
  }

  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    return this.categoryService.removeCategory(id);
  }

  @Get(':title')
  async filterCategory(@Param('title') title: string) {
    return this.categoryService.filterCategory(title)
  }
}
