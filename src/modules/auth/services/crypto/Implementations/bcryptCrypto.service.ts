import { Injectable } from '@nestjs/common';
import { CryptoServices } from '../crypto.abs.service';

@Injectable()
export class BcryptCryptoService implements CryptoServices {
  async hash(dataToHash: string): Promise<string> {
    return;
    //TODO
  }
  async verify(hashedData: string, plainData: string): Promise<boolean> {
    //TODO
    return;
  }
  async verifyOrThrow(hashedData: string, plainData: string): Promise<boolean> {
    //TODO
    return;
  }
}
