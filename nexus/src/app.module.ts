import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { FollowModule } from './follow/follow.module';
import { UploadModule } from './upload/upload.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PostModule,
    CommentModule,
    FollowModule,
    UploadModule,
    LikeModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env['DATABASE_URL'],
      }),
    }),
  ],
})
export class AppModule {}
