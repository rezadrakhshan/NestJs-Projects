import { Module, Global } from '@nestjs/common';
import { PostgreService } from './postgres/postgres.service';

@Global()
@Module({
  providers: [PostgreService],
  exports: [PostgreService],
})
export class DatabasesModule {}
