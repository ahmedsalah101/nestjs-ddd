import { Controller, Get, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { AuthModule } from './modules/auth';
import { APP_FILTER } from '@nestjs/core';

import { HttpExceptionFilter } from '@common/services';

@Controller()
export class TestController {
  @Get()
  async test() {
    const formatMemoryUsage = (data) =>
      `${Math.round((data / 1024 / 1024) * 100) / 100} MB`;

    const memoryData = process.memoryUsage();

    const memoryUsage = {
      rss: `${formatMemoryUsage(
        memoryData.rss,
      )} -> Resident Set Size - total memory allocated for the process execution`,
      heapTotal: `${formatMemoryUsage(
        memoryData.heapTotal,
      )} -> total size of the allocated heap`,
      heapUsed: `${formatMemoryUsage(
        memoryData.heapUsed,
      )} -> actual memory used during the execution`,
      external: `${formatMemoryUsage(
        memoryData.external,
      )} -> V8 external memory`,
    };

    console.log(memoryUsage);
  }
}
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
    AuthModule,
  ],
  controllers: [TestController],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
  ],
})
export class AppModule {}
