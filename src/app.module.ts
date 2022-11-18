import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { AuthController } from './modules/auth/controllers/auth.controller';
import { JwtAuthModule } from './modules/auth/services/authorization/jwt/jwt-auth.DI.module';
import { AuthRepoModule } from './modules/auth/repos/repo.DI.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/ddd'),
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
    AuthRepoModule
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
