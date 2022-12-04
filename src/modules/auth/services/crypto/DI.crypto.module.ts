import { Module } from '@nestjs/common';
import { CryptoServices } from './abs.crypto.service';
import { ArgonCryptoService } from './Implementations';

@Module({
  imports: [],
  providers: [{ provide: CryptoServices, useClass: ArgonCryptoService }],
  exports: [CryptoServices],
})
export class CryptoModule {}
