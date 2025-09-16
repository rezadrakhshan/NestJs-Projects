import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from 'src/database/entity/comment.entity';
import { Blog } from 'src/database/entity/blog.entity';
import { User } from 'src/database/entity/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createComment(data, blogId, req) {
    const target = await this.blogRepository.findOne({ where: { id: blogId } });
    if (!target) {
      throw new NotFoundException(`Blog with id ${blogId} not found.`);
    }
    const user = await this.userRepository.findOne({
      where: { id: req.user.sub },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${req.user.sub} not found.`);
    }
    const comment = this.commentRepository.create({
      content: data.content,
      author: user,
      blog: target,
    });
    return await this.commentRepository.save(comment);
  }

  async getAllBlogComment(id) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found.`);
    }
    const comments = await this.commentRepository.find({
      where: { blog: { id } },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
    return {
      blogId: id,
      totalComments: comments.length,
      comments: comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        author: {
          id: comment.author.id,
          fullName: `${comment.author.firstName} ${comment.author.lastName}`,
        },
        createdAt: comment.createdAt,
      })),
    };
  }

  async updateComment(data, id, req) {
    const comment = await this.commentRepository.findOne({
      where: { id: id, author: { id: req.user.sub } },
    });
    if (!comment)
      throw new NotFoundException(`Comment with id ${id} not found or you are not authorized to update it.`);
    comment.content = data.content;
    return await this.commentRepository.save(comment);
  }

async removeComment(id, req) {
    const comment = await this.commentRepository.findOne({
        where: { id, author: { id: req.user.sub } },
    });
    if (!comment) {
        throw new NotFoundException(`Comment with id ${id} not found or you are not authorized to delete it.`);
    }
    await this.commentRepository.delete(comment.id);
    return { message: 'Comment deleted successfully.', id: comment.id };
}
}
