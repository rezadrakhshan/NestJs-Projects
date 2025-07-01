import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Req,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
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
}
