import { AppError, EitherFailOrVal } from '@common/core';
import { AggregateRoot } from 'src/common/domain/AggregateRoot';
import { EntityID } from 'src/common/domain/EntityID';
import { UserProfile } from 'src/modules/auth/domain/profile';
import { z } from 'zod';
import { CoreCredentials } from './core.credentials';
import { CoreUserCreatedEvent } from './events/core.userCreated.event';

type RegisterUserResult = EitherFailOrVal<AppError.InteralError, CoreUser>;
interface CoreUserProps {
  credentials: CoreCredentials;
  profile: UserProfile;
}
export class CoreUser extends AggregateRoot<CoreUserProps> {
  private constructor(coreCredProps: CoreUserProps, id?: EntityID) {
    super(coreCredProps, id);
  }
  get id(): EntityID {
    return this._id;
  }

  static register(
    coreUserProps: CoreUserProps,
    id?: EntityID,
  ): RegisterUserResult {
    return;
  }
}
