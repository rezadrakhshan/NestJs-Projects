import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Req,
  UsePipes,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileInterceptor('thumbnail'))
  async createBlog(
    @Body() data: CreateBlogDto,
    @Req() req: Request,
    @UploadedFile() thumbnail,
  ) {
    return this.blogService.createBlog(data, thumbnail, req);
  }
}
