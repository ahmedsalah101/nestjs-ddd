import { Module } from '@nestjs/common';
import { AuthController } from './auth/controllers/auth.controller';
import { JwtAuthModule } from './auth/services/auth/jwt/jwt-auth.DI.module';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
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
