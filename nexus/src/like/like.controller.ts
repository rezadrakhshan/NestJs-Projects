import { Controller, Post,Delete, Req, Param } from '@nestjs/common';
import { LikeService } from './like.service';
import { Request } from 'express';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post(':id')
  async likePost(@Req() req: Request, @Param('id') id: string) {
    return this.likeService.likePost(req, id);
  }
  @Delete(':id')
  async disLikePost(@Req() req: Request, @Param('id') id: string) {
    return this.likeService.disLikePost(req, id);
  }
}
