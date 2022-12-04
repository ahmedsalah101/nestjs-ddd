import { Mapper, Result } from '@common/core';
import { UserProfile } from 'src/modules/auth/domain/profile';

import { CoreCredentials } from '../domain/core.credentials';
import { MongoProfile } from '../repos/Implementations/mongoose/schemas/mongoProfile';

//@staticImplements<Mapper<CoreCredentials>>()
export class ProfileMap {
  static toDomain(raw: any): Result<CoreCredentials> {
    return;
  }

  static toMongoPersistence(profile: UserProfile): MongoProfile {
    return {
      profileId: profile.profileId.toString(),
      firstName: profile.firstName,
    };
  }
}
