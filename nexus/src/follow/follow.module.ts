import { Module } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Follow, followSchema } from './schemas/follow.schema';
import { User, userSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Follow.name, schema: followSchema },
      { name: User.name, schema: userSchema },
    ]),
  ],
  controllers: [FollowController],
  providers: [FollowService],
})
export class FollowModule {}
