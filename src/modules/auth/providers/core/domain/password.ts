import { EitherFailOrVal, resFail, resValue } from '@common/core';
import { Result } from 'src/common/core/Result';
import { staticImplements } from 'src/common/core/utils';
import { ValueObject } from 'src/common/domain/ValueObject';
import { z } from 'zod';
import { RegisterError } from '../useCases/Register/register.error';

//@staticImplements<ValueObjectFactory<string, Password>>()
export class Password extends ValueObject<string> {
  private constructor(id: string) {
    super(id);
  }

  toString() {
    return String(this.value);
  }

  static parse(
    passVal: string,
  ): EitherFailOrVal<RegisterError.InvalidPasswordError, Password> {
    const passSchema = z.string().min(8);
    const parseResult = passSchema.safeParse(passVal);
    if (parseResult.success === true) {
      return resValue(new Password(parseResult.data));
    }
    return resFail(
      new RegisterError.InvalidPasswordError(parseResult.error.message),
    );
  }
}
