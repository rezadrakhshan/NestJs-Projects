import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Body,
  ValidationPipe,
  Req,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

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

  @Get()
  async getAllBlog() {
    return this.blogService.getAllBlog();
  }

  @Get('/user')
  async getUserBlog(@Req() req: Request) {
    return this.blogService.getUserBlog(req);
  }

  @Get(':id')
  async getSingleBlog(@Param('id') id: string) {
    return this.blogService.getSingleBlog(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileInterceptor('thumbnail'))
  async updateBlog(
    @Body() data: UpdateBlogDto,
    @Param('id') id: string,
    @Req() req: Request,
    @UploadedFile() thumbnail,
  ) {
    return this.blogService.updateBlog(data, id, req, thumbnail);
  }

  @Delete(':id')
  async removeBlog(@Param('id') id:string , @Req() req:Request){
    return this.blogService.deleteBlog(req,id)
  }
}
