import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, likeSchema } from './schemas/like.schema';
import { Post, postSchema } from 'src/post/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Like.name, schema: likeSchema },
      { name: Post.name, schema: postSchema },
    ]),
  ],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
