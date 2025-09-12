import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/database/entity/comment.entity';
import { Blog } from 'src/database/entity/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Blog])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
