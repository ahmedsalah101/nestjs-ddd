import { z } from 'zod';
import { RegisterError } from '../useCases/Register/register.error';
import { EitherFailOrVal, resFail, resValue } from '@common/core';
import { ValueObject } from 'src/common/domain/ValueObject';

// @staticImplements<
//   ValueObjectFactory<string, Email, RegissterError.EmailError>
// >()
export class Email extends ValueObject<string> {
  private constructor(emailVal: string) {
    super(emailVal);
  }
  toString() {
    return String(this.value);
  }

  static parse(
    emailVal: string,
  ): EitherFailOrVal<RegisterError.InvalidEmailError, Email> {
    const emailSchema = z.string().email();
    const parseResult = emailSchema.safeParse(emailVal);
    if (parseResult.success === true) {
      return resValue(new Email(parseResult.data));
    }
    return resFail(
      new RegisterError.InvalidEmailError({
        errMessage: parseResult.error.message,
      }),
    );
  }
}
