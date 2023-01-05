import { Mapper, Result } from '@common/core';
import { UserProfile } from 'src/modules/auth/domain/profile';

import { CoreCredentials } from '../domain/core.credentials';
import { MongoProfile } from '../repos/Implementations/mongoose/schemas/mongo.profile';

//@staticImplements<Mapper<CoreCredentials>>()
export interface RawProfile {
  firstName: string;
  _id: string;
}
export class ProfileMap {
  static toDomain(raw: RawProfile): UserProfile {
    const profileParseResult = UserProfile.parse(
      { firstName: raw.firstName },
      raw._id,
    );
    if (profileParseResult.isFail()) return null;
    return profileParseResult.value;
  }

  static toPersistence<T extends RawProfile>(profile: UserProfile): RawProfile {
    return {
      firstName: profile.firstName,
      _id: profile.profileId.toString(),
    };
  }
}
