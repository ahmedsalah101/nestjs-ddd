import { Result } from '../../../common/core';
import {
  ValueObject,
  ValueObjectFactory,
} from '../../../common/domain/ValueObject';
import { z } from 'zod';
import { staticImplements } from 'src/common/core/utils';

@staticImplements<ValueObjectFactory<string, Email>>()
export class Email extends ValueObject<string> {
  private constructor(emailVal: string) {
    super(emailVal);
  }
  toString() {
    return String(this.value);
  }

  static parse(emailVal: string): Result<Email> {
    const emailSchema = z.string().email();
    const parseResult = emailSchema.safeParse(emailVal);
    if (parseResult.success === true) {
      return Result.ok<Email>(new Email(parseResult.data));
    }
    return Result.fail<Email>(parseResult.error.flatten().formErrors);
  }
}
