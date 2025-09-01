import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/database/entity/blog.entity';
import { User } from 'src/database/entity/user.entity';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, User]), UploadModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
