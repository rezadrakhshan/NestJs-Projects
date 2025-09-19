import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Body,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateCategoryDto } from './dto/create.dto';
import { UpdateCategoryDto } from './dto/update.dto';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createCategory(@Body() data: CreateCategoryDto) {
    return this.productCategoryService.createCategory(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateCategory(
    @Param('id') id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.productCategoryService.updateCategory(id, data);
  }

  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    return this.productCategoryService.removeCategory(id);
  }

  @Get()
  async getAllCategory() {
    return this.productCategoryService.getAllCategory();
  }
}
