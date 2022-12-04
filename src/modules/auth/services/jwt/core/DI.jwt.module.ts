import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtOptionsProvider } from './Implementations/nestjs-jwt/config/jwt-options.provider';

import { NestJwtAuthService } from './Implementations/nestjs-jwt/nestjs.jwt.service';
import { JwtAuthService } from './abs.jwt.service';

@Module({
  imports: [JwtModule],
  providers: [
    JwtOptionsProvider,
    { provide: JwtAuthService, useClass: NestJwtAuthService },
  ],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
