import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtOptionsProvider } from './Implementations/config/jwt-options.provider';
import { NestJwtAuthService } from './Implementations/nestjs-jwtAuth.service';
import { JwtAuthService } from './jwtAuth.service';

@Module({
  imports: [JwtModule],
  providers: [
    JwtOptionsProvider,
    { provide: JwtAuthService, useClass: NestJwtAuthService },
  ],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
