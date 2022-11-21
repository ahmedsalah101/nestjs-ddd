import { Module } from '@nestjs/common';
import { HttpService } from './http.abs.service';
import { ExpressHttpService } from './Implementations/express.http.service';

@Module({
  providers: [{ provide: HttpService, useClass: ExpressHttpService }],
  exports: [HttpService],
})
export class HttpServiceModule {}
