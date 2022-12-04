import { EitherFailOrVal, resFail, Result, resValue } from '@common/core';
import { EntityID } from 'src/common/domain/EntityID';
import { Credentials } from 'src/modules/auth/domain';
import { UserProfile } from 'src/modules/auth/domain/profile';
import { Email } from 'src/modules/auth/providers/core/domain/Email';
import { InvalidCredError } from './core.cred.error';
import { HashedPassword } from './hashedPassword';

interface CoreCredentialsProps {
  profile: UserProfile;
  email: Email;
  hashedPassword: HashedPassword;
}

export class CoreCredentials extends Credentials<CoreCredentialsProps> {
  private constructor(coreCredProps: CoreCredentialsProps, id?: EntityID) {
    super(coreCredProps, id);
  }
  public get id(): EntityID {
    return this._id;
  }
  public get email(): Email {
    return this.props.email;
  }
  public get profile(): UserProfile {
    return this.props.profile;
  }

  public get hashedPassowrd(): HashedPassword {
    return this.props.hashedPassword;
  }

  static create(
    coreCredDTO: CoreCredentialsProps,
    id?: EntityID,
  ): EitherFailOrVal<InvalidCredError, CoreCredentials> {
    return resValue(
      new CoreCredentials(
        {
          email: coreCredDTO.email,
          hashedPassword: coreCredDTO.hashedPassword,
          profile: coreCredDTO.profile,
        },
        id,
      ),
    );
  }
}
