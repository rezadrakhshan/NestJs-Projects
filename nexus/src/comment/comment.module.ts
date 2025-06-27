import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, commentSchema } from './schemas/comment.schema';
import { Post, postSchema } from 'src/post/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: commentSchema },
      { name: Post.name, schema: postSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
