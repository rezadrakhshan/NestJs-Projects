import { Module, Global } from '@nestjs/common';
import { PostgreService } from './postgres/postgres.service';
import { RedisService } from './redis/redis.service';

@Global()
@Module({
  providers: [PostgreService, RedisService],
  exports: [PostgreService, RedisService],
})
export class DatabasesModule {}
