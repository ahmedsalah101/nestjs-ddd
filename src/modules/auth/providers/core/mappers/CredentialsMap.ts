import { Mapper, Result } from '@common/core';
import { staticImplements } from 'src/common/core/utils';
import { EntityID } from 'src/common/domain/EntityID';
import { Email } from 'src/modules/auth/domain/Email';
import { CoreCredentials } from '../domain/core.credentials';

//@staticImplements<Mapper<CoreCredentials>>()
export class CoreCredMap {
  static toDomain(raw: any): Result<CoreCredentials> {
    const emailParseResult = Email.parse(raw.user_email);
    const userIdParseResult = EntityID.parse(raw.user_id);
    const credId = raw.credId;
    const password = raw.password;

    if (userIdParseResult.isFailure)
      return Result.fail<CoreCredentials>(userIdParseResult.errorValue);
    if (emailParseResult.isFailure)
      return Result.fail<CoreCredentials>(emailParseResult.errorValue);
    // return CoreCredentials.create(
    //   {
    //     email: emailParseResult.successValue.toString(),
    //     hashedPassword: password,
    //     userId: userIdParseResult.successValue.toString(),
    //   },
    //   user_id,
    // );
  }

  static toPersistence(t: CoreCredentials) {
    return {
      // user_email: t.email,
    };
  }
}
