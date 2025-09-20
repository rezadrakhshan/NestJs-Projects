import {
  Controller,
  Post,
  Body,
  Delete,
  Get,
  Param,
  UploadedFiles,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create=product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'thumbnail', maxCount: 1 },
      { name: 'images', maxCount: 5 },
    ]),
  )
  async createProduct(
    @Body() data: CreateProductDto,
    @UploadedFiles()
    files: {
      thumbnail;
      images;
    },
  ) {
    const thumbnail = files.thumbnail?.[0];
    const images = files.images || [];
    return this.productService.createProduct(data, thumbnail, images);
  }

  @Get()
  async getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Get(':id')
  async getProductDetail(@Param('id') id: string) {
    return this.productService.getProductDetail(id);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    return this.productService.removeProduct(id)
  }
}
