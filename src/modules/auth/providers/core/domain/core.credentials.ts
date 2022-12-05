import { EitherFailOrVal, resFail, Result, resValue } from '@common/core';
import { EntityID } from 'src/common/domain/EntityID';
import { Credentials } from 'src/modules/auth/domain';
import { UserProfile } from 'src/modules/auth/domain/profile';
import { Email } from 'src/modules/auth/providers/core/domain/Email';
import { RegisterError } from '../useCases/Register/register.error';
import { InvalidCredError } from './core.cred.error';
import { HashedPassword } from './hashedPassword';

interface CoreCredentialsProps {
  profile: UserProfile;
  email: Email;
  hashedPassword: HashedPassword;
}

interface CreateDTOProps {
  profile: UserProfile;
  email: string;
  password: string;
}

interface ParseDTOProps {
  profile: UserProfile;
  email: string;
  hashedPassword: string;
}

export class CoreCredentials extends Credentials<CoreCredentialsProps> {
  private constructor(coreCredProps: CoreCredentialsProps, id: EntityID) {
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

  static async create(
    coreCredDTO: CreateDTOProps,
  ): Promise<EitherFailOrVal<InvalidCredError, CoreCredentials>> {
    const emailParseResult = Email.parse(coreCredDTO.email);
    if (emailParseResult.isFail()) return resFail(emailParseResult.value);

    const hashedPassowrdParseResult = await HashedPassword.genFrom(
      coreCredDTO.password,
    );
    if (hashedPassowrdParseResult.isFail())
      return resFail(hashedPassowrdParseResult.value);

    return resValue(
      new CoreCredentials(
        {
          email: emailParseResult.value,
          hashedPassword: hashedPassowrdParseResult.value,
          profile: coreCredDTO.profile,
        },
        EntityID.generate(),
      ),
    );
  }

  static parse(
    coreCredDTO: ParseDTOProps,
    id: string,
  ): EitherFailOrVal<InvalidCredError, CoreCredentials> {
    const emailParseResult = Email.parse(coreCredDTO.email);
    if (emailParseResult.isFail()) return resFail(emailParseResult.value);

    const hashedPassowrdParseResult = HashedPassword.parse(
      coreCredDTO.hashedPassword,
    );
    if (hashedPassowrdParseResult.isFail())
      return resFail(hashedPassowrdParseResult.value);

    const idParseResult = EntityID.parse(id);
    if (idParseResult.isFail()) return resFail(idParseResult.value);

    return resValue(
      new CoreCredentials(
        {
          email: emailParseResult.value,
          hashedPassword: hashedPassowrdParseResult.value,
          profile: coreCredDTO.profile,
        },
        idParseResult.value,
      ),
    );
  }
}
