import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-cmment.dto';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':id')
  async getAllCommentOfPost(@Param('id') id: string) {
    return this.commentService.getAllCommentOfPost(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createComment(@Body() data: CreateCommentDto, @Req() req: Request) {
    return this.commentService.createComment(data, req);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateComment(
    @Param('id') id: string,
    @Body() data: UpdateCommentDto,
    @Req() req: Request,
  ) {
    return this.commentService.updateComment(id, data, req);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: string, @Req() req: Request) {
    return this.commentService.deleteComment(id, req);
  }
}
