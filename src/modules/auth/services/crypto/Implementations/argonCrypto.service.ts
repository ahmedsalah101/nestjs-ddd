import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { CryptoServices } from '../crypto.service';

@Injectable()
export class ArgonCryptoService implements CryptoServices {
  async hash(dataToHash: string): Promise<string> {
    return await argon.hash(dataToHash);
  }

  async verify(hashedData: string, plainData: string): Promise<boolean> {
    return await argon.verify(hashedData, plainData);
  }

  async verifyOrThrow(hashedData: string, plainData: string): Promise<boolean> {
    const isMatching = await argon.verify(hashedData, plainData);
    if (!isMatching) {
      throw new Error('input data Not Matched');
    }
    return isMatching;
  }
}
