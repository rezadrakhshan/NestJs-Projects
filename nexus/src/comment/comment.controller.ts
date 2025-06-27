import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':id')
  async getAllCommentOfPost(@Param('id') id: string) {
    return this.commentService.getAllCommentOfPost(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createComment(@Body() data: CreateCommentDto, @Req() req) {
    return this.commentService.createComment(data, req);
  }
}
