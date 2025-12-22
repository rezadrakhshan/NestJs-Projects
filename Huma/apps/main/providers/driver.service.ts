import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from 'src/databases/redis/redis.service';

@Injectable()
export class DriverService {
  private static readonly role = 'driver';
  constructor(private readonly redis: RedisService) {}
  async requestOtp({ phone }: { phone: string }) {
    const key = `otp:${DriverService.role}:${phone}`;
    const existing = await this.redis.cacheCli.get(key);
    if (existing) throw new BadRequestException('OTP already sent');

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const ttl = 2 * 60;
    await this.redis.cacheCli.set(key, otp, 'EX', otp);
    return { success: true, phone, expiresIn: ttl };
  }
}
