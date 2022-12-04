import { ValueObject } from 'src/common/domain/ValueObject';
import { Password } from './password';
import { CryptoServices } from '@auth/crypto';
import { z } from 'zod';
import { EitherFailOrVal, resFail, resValue } from '@common/core';
import { InvalidHashedPasswordError, NotMatchedError } from './core.cred.error';
import { ArgonCryptoService } from 'src/modules/auth/services/crypto/Implementations';
import * as argon from 'argon2';
type HashedPasswordResult = EitherFailOrVal<
  InvalidHashedPasswordError,
  HashedPassword
>;

export class HashedPassword extends ValueObject<string> {
  private static cryptoService: CryptoServices;
  private constructor(id: string) {
    super(id);
  }

  static parse(
    hashedPasswordVal: string,
  ): EitherFailOrVal<InvalidHashedPasswordError, HashedPassword> {
    const emailSchema = z.string().startsWith('$argon2id');
    const parseResult = emailSchema.safeParse(hashedPasswordVal);
    if (parseResult.success === true) {
      return resValue(new HashedPassword(parseResult.data));
    }
    return resFail(
      new InvalidHashedPasswordError({ errMessage: parseResult.error.message }),
    );
  }
  static async genFrom(passVal: Password) {
    const isCryptoServicesProvided = !!this.cryptoService;
    const hashedPassword = isCryptoServicesProvided
      ? await this.cryptoService.hash(passVal.toString())
      : await argon.hash(passVal.toString());
    return new HashedPassword(hashedPassword);
  }
  static using(cryptoServices: CryptoServices) {
    this.cryptoService = cryptoServices;
    return this;
  }

  toString() {
    return String(this.value);
  }
}

//static -> class level -> type : (typeof HashedPassword)
//member -> instnace level -> type : (HashedPassword)
