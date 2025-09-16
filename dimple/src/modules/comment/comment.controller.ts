import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Body,
  Param,
  Req,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post(':blog')
  @UsePipes(new ValidationPipe())
  async createComment(
    @Body() data: CreateCommentDto,
    @Param('blog') blog: string,
    @Req() req: Request,
  ) {
    return this.commentService.createComment(data, blog, req);
  }

  @Get(':id')
  async getAllBlogComment(@Param('id') id: string) {
    return this.commentService.getAllBlogComment(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateComment(
    @Body() data: UpdateCommentDto,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    return this.commentService.updateComment(data, id, req);
  }

  @Delete(':id')
  async removeComment(@Param('id') id: string, @Req() req: Request) {
    return this.commentService.removeComment(id, req);
  }
}
