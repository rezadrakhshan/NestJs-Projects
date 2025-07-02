import {
  Controller,
  Post,
  Delete,
  Get,
  Put,
  Param,
  UsePipes,
  ValidationPipe,
  Body,
  Req,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('files', 5))
  async createPost(
    @Body() data: CreatePostDto,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.postService.createPost(data, req, files);
  }

  @Delete(':id')
  async removePost(@Param('id') id: string, @Req() req: Request) {
    return this.postService.removePost(id, req);
  }

  @Get()
  async getAllPost() {
    return this.postService.getAllPost();
  }

  @Get('user')
  async getUserPosts(@Req() req: Request) {
    return this.postService.getUserPosts(req);
  }

  @Get(':id')
  async postDetail(@Param('id') id: string) {
    return this.postService.postDetail(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FilesInterceptor('files', 5))
  async updatePost(
    @Body() data: UpdatePostDto,
    @Param('id') id: string,
    @Req() req: Request,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.postService.updatePost(data, id, req, files);
  }
}
