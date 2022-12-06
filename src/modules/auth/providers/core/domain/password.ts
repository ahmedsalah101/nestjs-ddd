import { EitherFailOrVal, resFail, resValue } from '@common/core';
import { Nominal } from 'src/common/core/utils';
import { ValueObject } from 'src/common/domain/ValueObject';
import { z } from 'zod';
import { RegisterError } from '../useCases/Register/register.error';

//@staticImplements<ValueObjectFactory<string, Password>>()

export class Password extends ValueObject<string> {
  private __nominal: void;
  constructor(id: string) {
    super(id);
  }

  toString() {
    return String(this.value);
  }

  static parse(
    passVal: string,
  ): EitherFailOrVal<RegisterError.InvalidPasswordError, Password> {
    const passSchema = z.string().min(8, { message: 'Required password' });
    const parseResult = passSchema.safeParse(passVal);
    if (parseResult.success === true) {
      return resValue(new Password(parseResult.data));
    }
    return resFail(
      new RegisterError.InvalidPasswordError({
        errMessage: 'Invalid Password Error',
        zodErrMessage: parseResult.error.message,
      }),
    );
  }
}
