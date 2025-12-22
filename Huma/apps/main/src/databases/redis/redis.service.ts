import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit {
  private logger = new Logger('database/redis/redis.service');
  public cacheCli!: Redis;
  public sessionCli!: Redis;
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const cacheClinet = new Redis({
      host: this.configService.get('Redis.host'),
      port: this.configService.get('Redis.port'),
      db: this.configService.get('Redis.cacheDb'),
    });
    cacheClinet.on('error', (e) => {
      this.logger.fatal('cacheClient connecting error');
      this.logger.fatal(e);
      process.exit(1);
    });
    cacheClinet.on('connect', () => {
      this.logger.verbose('cahceClient is connected');
    });
    this.cacheCli = cacheClinet;
    const sessionClinet = new Redis({
      host: this.configService.get('Redis.host'),
      port: this.configService.get('Redis.port'),
      db: this.configService.get('Redis.sessionDb'),
    });
    sessionClinet.on('error', (e) => {
      this.logger.fatal('sessionClient connecting error');
      this.logger.fatal(e);
      process.exit(1);
    });
    sessionClinet.on('connect', () => {
      this.logger.verbose('sessionClient is connected');
    });
    this.sessionCli = sessionClinet;
  }
}
