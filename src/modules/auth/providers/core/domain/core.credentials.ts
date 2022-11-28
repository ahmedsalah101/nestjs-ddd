import { Result } from '@common/core';
import { Entity } from 'src/common/domain/Entity';
import { EntityID } from 'src/common/domain/EntityID';
import { Credentials } from 'src/modules/auth/domain';
import { Email } from 'src/modules/auth/domain/Email';
import { z } from 'zod';
import { Password } from './password';

interface CoreCredentialsProps extends Credentials {
  email: Email;
  password: Password;
}
export class CoreCredentials extends Entity<CoreCredentialsProps> {
  private constructor(coreCredProps: CoreCredentialsProps, id?: EntityID) {
    super(coreCredProps, id);
  }
  static create(
    coreCredProps: CoreCredentialsProps,
    id?: EntityID,
  ): Result<CoreCredentials> {
    const NonEmptySchema = z.map(z.string(), z.any());
    return Result.ok<CoreCredentials>(new CoreCredentials(coreCredProps, id));
  }
}

const NonEmptySchema = z.object({ password: z.record(z.any()) }).required();
const res = NonEmptySchema.safeParse({
  password: Password.parse('aaaaaaaaaaaa').successValue,
});

console.log(res.success);
