import { Result } from 'src/common/core/Result';
import { staticImplements } from 'src/common/core/utils';
import { ValueObject, ValueObjectFactory } from 'src/common/domain/ValueObject';
import { z } from 'zod';

@staticImplements<ValueObjectFactory<string, Password>>()
export class Password extends ValueObject<string> {
  private constructor(id: string) {
    super(id);
  }

  toString() {
    return String(this.value);
  }

  static parse(passVal: string): Result<Password> {
    const passSchema = z.string().min(8);
    const parseResult = passSchema.safeParse(passVal);
    if (parseResult.success === true) {
      return Result.ok<Password>(new Password(parseResult.data));
    }
    return Result.fail<Password>(parseResult.error.flatten().formErrors);
  }
}
