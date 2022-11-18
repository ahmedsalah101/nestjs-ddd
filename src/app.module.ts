import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { AuthController } from './modules/auth/controllers/auth.controller';
import { JwtAuthModule } from './modules/auth/services/authorization/jwt/jwt-auth.DI.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: joi.object({
        JWT_ACCESS_TOKEN_SECRET: joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: joi.string().required(),
        JWT_ACCESS_TOKEN_EXP_TIME: joi.number().required(),
        JWT_REFRESH_TOKEN_EXP_TIME: joi.number().required(),
      }),
      envFilePath: './.env',
    }),
    JwtAuthModule,
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
