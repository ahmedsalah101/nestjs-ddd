import { Optional } from '@common/core';
import { EntityID } from 'src/common/domain/EntityID';
import { UserProfile } from 'src/modules/auth/domain/profile';
import { CoreCredentials } from '../domain/core.credentials';
import { Email } from '../domain/Email';
import { HashedPassword } from '../domain/hashedPassword';
import { ProfileMap, RawProfile } from './ProfileMap';

export interface RawCoreCred {
  _id: string;
  email: string;
  profile: RawProfile;
  hashedPassword: string;
}

//@staticImplements<Mapper<CoreCredentials>>()
export class CoreCredMap {
  static toDomain(raw: RawCoreCred): Optional<CoreCredentials> {
    const cred = CoreCredentials.parse(
      {
        email: raw.email,
        hashedPassword: raw.hashedPassword,
        profile: ProfileMap.toDomain(raw.profile),
      },
      raw._id,
    );
    if (cred.isFail()) return null;
    return cred.value;
  }

  static toPersistence<T extends RawCoreCred>(
    credentials: CoreCredentials,
  ): RawCoreCred {
    return {
      _id: credentials.id.toString(),
      email: credentials.email.toString(),
      profile: ProfileMap.toPersistence(credentials.profile),
      hashedPassword: credentials.hashedPassowrd.toString(),
      // user_email: t.email,
    };
  }
}
