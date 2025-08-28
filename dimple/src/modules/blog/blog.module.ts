import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entity/user.entity';
import { Blog } from './entity/blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Blog])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
