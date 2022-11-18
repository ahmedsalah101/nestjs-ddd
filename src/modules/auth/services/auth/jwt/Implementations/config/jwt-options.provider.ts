import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_ACCESS_TOKEN_EXP_TIME, JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_EXP_TIME, JWT_REFRESH_TOKEN_SECRET } from '../constants/jwt.constants';

@Injectable()
export class JwtOptionsProvider {
  constructor(private readonly configService: ConfigService) {}

  accessTokenSecret = this.configService.get<string>(JWT_ACCESS_TOKEN_SECRET);
  refreshTokenSecret = this.configService.get<string>(JWT_REFRESH_TOKEN_SECRET);
  accessTokenExpTime = this.configService.get<number>(
    JWT_ACCESS_TOKEN_EXP_TIME,
  );
  refreshTokenExpTime = this.configService.get<number>(JWT_REFRESH_TOKEN_EXP_TIME);

  accessTokenOptions = {
    secret: this.accessTokenSecret,
    expiresIn: `${this.accessTokenExpTime}s`,
  };

  refreshTokenOptions = {
    secret: this.refreshTokenSecret,
    expiresIn: `${this.refreshTokenExpTime}s`,
  };
}
