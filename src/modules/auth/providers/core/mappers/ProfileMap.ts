import { Mapper, Result } from '@common/core';
import { UserProfile } from 'src/modules/auth/domain/profile';

import { CoreCredentials } from '../domain/core.credentials';

//@staticImplements<Mapper<CoreCredentials>>()
export class ProfileMap {
  static toDomain(raw: any): Result<CoreCredentials> {
    return;
  }

  static toPersistence(profile: UserProfile) {
    return {
      firstName: profile.firstName,
    };
  }
}
