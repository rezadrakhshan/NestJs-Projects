import { Controller, Post,Delete, Param, Req } from '@nestjs/common';
import { FollowService } from './follow.service';
import { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post(':id')
  async followUser(@Param('id') id: string, @Req() req: Request) {
    return this.followService.followUser(id, req);
  }
  @Delete(':id')
  async unFollowUser(@Param('id') id: string, @Req() req: Request) {
    return this.followService.unFollowUser(id, req);
  }
}
