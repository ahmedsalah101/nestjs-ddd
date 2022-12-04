import { Mapper, Result } from '@common/core';
import { staticImplements } from 'src/common/core/utils';
import { EntityID } from 'src/common/domain/EntityID';
import { Email } from 'src/modules/auth/providers/core/domain/Email';
import { CoreCredentials } from '../domain/core.credentials';

//@staticImplements<Mapper<CoreCredentials>>()
export class CoreCredMap {
  static toDomain(raw: any): Result<CoreCredentials> {
    return;
  }

  static toPersistence(credentials: CoreCredentials) {
    return {
      email: credentials.email.toString(),
      profileId: credentials.profileId.toString(),
      hashedPassword: credentials.hashedPassowrd.toString(),
      // user_email: t.email,
    };
  }
}
