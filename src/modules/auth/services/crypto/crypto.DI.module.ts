import { Module } from '@nestjs/common';
import { CryptoServices } from './crypto.abs.service';
import { ArgonCryptoService } from './Implementations';

@Module({
  imports: [],
  providers: [{ provide: CryptoServices, useClass: ArgonCryptoService }],
  exports: [CryptoServices],
})
export class CryptoModule {}
