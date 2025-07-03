import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, likeSchema } from './schemas/like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: likeSchema }]),
  ],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
