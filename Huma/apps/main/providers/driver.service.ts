import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PostgreService } from 'src/databases/postgres/postgres.service';
import { RedisService } from 'src/databases/redis/redis.service';
import {
  ServiceClientContextDto,
  ServiceResponseData,
  SrvError,
} from 'src/services/dto';
import { TokenService } from 'utils/handled/token.service';

@Injectable()
export class DriverService {
  private static readonly role = 'driver';
  constructor(
    private readonly pg: PostgreService,
    private readonly redis: RedisService,
    private readonly tokenService: TokenService,
  ) {}
  async requestOtp({
    query,
  }: ServiceClientContextDto): Promise<ServiceResponseData> {
    let { phone } = query;
    const key = `otp:${DriverService.role}:${phone}`;
    const existing = await this.redis.cacheCli.get(key);
    if (existing)
      throw new SrvError(HttpStatus.BAD_REQUEST, 'OTP already sent');

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const ttl = 2 * 60;
    await this.redis.cacheCli.set(key, otp, 'EX', otp);
    return {
      message: 'OTP send successfuly',
      data: {
        success: true,
        otp,
        phone,
        expiresIn: ttl,
      },
    };
  }

  async verifyOtp({
    query,
  }: ServiceClientContextDto): Promise<ServiceResponseData> {
    const { phone, otp } = query;
    const key = `otp:${DriverService.role}:${phone}`;
    const savedOtp = await this.redis.cacheCli.get(key);
    if (!savedOtp)
      throw new SrvError(HttpStatus.BAD_REQUEST, 'OTP not found or expired');

    if (savedOtp !== otp)
      throw new SrvError(HttpStatus.BAD_REQUEST, 'Invalid OTP');
    await this.redis.cacheCli.del(key);

    let driver = await this.pg.models.Driver.findOne({ where: { phone } });
    if (!driver) {
      driver = await this.pg.models.Driver.create({ phone });
    }

    const newSession = await this.pg.models.DriverSession.create({
      driverID: driver.id,
      refreshExpiresAt: +new Date(),
    });

    const access_token = this.tokenService.generateAccessToken({
      driverID: driver.id,
      sessionID: newSession.id,
    });

    await newSession.update({
      refreshExpiresAt: access_token.payload.refreshExpiresAt,
    });
    await newSession.reload();

    return {
      message: 'OTP verified successfuly',
      data: {
        success: true,
        phone,
        access_token,
      },
    };
  }
}
