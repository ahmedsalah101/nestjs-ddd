import { Result } from '@common/core';
import { CoreCredentials } from '../domain/core.credentials';

//@staticImplements<Mapper<CoreCredentials>>()
export class CoreCredMap {
  static toDomain(raw: any): Result<CoreCredentials> {
    return;
  }

  static toPersistence(credentials: CoreCredentials) {
    return {
      credId: credentials.id.toString(),
      email: credentials.email.toString(),
      profileId: credentials.profile.profileId.toString(),
      hashedPassword: credentials.hashedPassowrd.toString(),
      // user_email: t.email,
    };
  }
}
