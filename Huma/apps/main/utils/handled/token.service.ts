import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export interface AccessTokenPayload {
  driverID: string;
  sessionID: string;
  accessExpiresAt: number;
  refreshExpiresAt: number;
}

export interface AccessTokenResult {
  name: string;
  ttl: number;
  token: string;
  payload: AccessTokenPayload;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessToken(params: {
    driverID: string;
    sessionID: string;
  }): AccessTokenResult {
    const now = Date.now();

    const accessExpiresInSec =
      this.configService.get<number>('Jwt.access.expiresInSeconds') ?? 3600;
    const refreshExpiresInSec =
      this.configService.get<number>('Jwt.refresh.expiresInSeconds') ?? 3600;

    const accessExpiresAt = accessExpiresInSec * 1000;
    const refreshExpiresAt = refreshExpiresInSec * 1000;

    const ttl = refreshExpiresInSec * 1000;

    const payload = {
      did: params.driverID,
      sid: params.sessionID,
      aea: accessExpiresAt,
      rea: refreshExpiresAt,
    };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('Jwt.access.secret'),
      expiresIn: accessExpiresInSec,
    });

    return {
      name: 'auth_driver',
      ttl,
      token,
      payload: {
        driverID: params.driverID,
        sessionID: params.sessionID,
        accessExpiresAt,
        refreshExpiresAt,
      },
    };
  }

  decode(token: string): any {
    try {
      return this.jwtService.decode(token);
    } catch (error) {
      return null;
    }
  }
}
