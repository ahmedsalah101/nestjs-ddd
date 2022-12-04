import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import {
  AuthCookie,
  JwtPayload,
  TokenOptions,
  Tokens,
} from 'src/modules/auth/domain';

import { JwtAuthService } from '../../abs.jwt.service';
import { JwtOptionsProvider } from './config/jwt-options.provider';

import {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
} from './constants/jwt.constants';
@Injectable()
export class NestJwtAuthService implements JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtOptionsProvider: JwtOptionsProvider,
    private readonly jwtAuthRepo,
  ) {}
  authenticateUser(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  genAccessToken<T extends JwtPayload>(
    tokenPayload: T,
    tokenOptions?: TokenOptions,
  ): string {
    return this.jwtService.sign(
      tokenPayload,
      tokenOptions || this.jwtOptionsProvider.accessTokenOptions,
    );
  }

  genRefreshToken<T extends JwtPayload>(
    tokenPayload: T,
    tokenOptions?: TokenOptions,
  ): string {
    return this.jwtService.sign(
      tokenPayload,
      tokenOptions || this.jwtOptionsProvider.refreshTokenOptions,
    );
  }

  genTokens<T extends JwtPayload>(
    tokenPayload: T,
    tokenOptions?: TokenOptions,
  ): Tokens {
    const accessToken = this.genAccessToken<T>(tokenPayload, tokenOptions);
    const refreshToken = this.genRefreshToken<T>(tokenPayload, tokenOptions);
    return { accessToken, refreshToken };
  }

  genAccessTokenCookie(accessToken: string): AuthCookie {
    const accessExpirationTime = this.jwtOptionsProvider.accessTokenExpTime;
    const accessExpires = new Date();
    accessExpires.setSeconds(accessExpires.getSeconds() + accessExpirationTime);
    const accessCookie: AuthCookie = {
      name: ACCESS_COOKIE_NAME,
      value: accessToken,
      options: {
        httpOnly: true,
        expires: accessExpires,
      },
    };
    return accessCookie;
  }

  genRefreshTokenCookie(refreshToken: string): AuthCookie {
    const refreshExpirationTime = this.jwtOptionsProvider.refreshTokenExpTime;
    const refreshExpires = new Date();
    refreshExpires.setSeconds(
      refreshExpires.getSeconds() + refreshExpirationTime,
    );
    const refershCookie: AuthCookie = {
      name: REFRESH_COOKIE_NAME,
      value: refreshToken,
      options: {
        httpOnly: true,
        expires: refreshExpires,
      },
    };
    return refershCookie;
  }

  genAuthCookies<T extends JwtPayload>(
    tokenPayload: T,
    tokenOptions?: TokenOptions,
  ): AuthCookie[] {
    const { accessToken, refreshToken } = this.genTokens(
      tokenPayload,
      tokenOptions,
    );
    return [
      this.genAccessTokenCookie(accessToken),
      this.genRefreshTokenCookie(refreshToken),
    ];
  }
}
