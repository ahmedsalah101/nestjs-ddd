import { Module } from '@nestjs/common';
import { DBServices } from './db.service';
import { MicroOrmService } from './Implementations';

@Module({
  imports: [],
  providers: [{ provide: DBServices, useClass: MicroOrmService }],
  exports: [DBServices],
})
export class AuthModule {}
