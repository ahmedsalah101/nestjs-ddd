import { Result } from '@common/core';
import { AggregateRoot } from 'src/common/domain/AggregateRoot';
import { EntityID } from 'src/common/domain/EntityID';
import { UserProfile } from 'src/modules/auth/domain/profile';
import { CoreCredentials } from './core.credentials';

interface CoreUserProps {
  credentials: CoreCredentials;
  profile: UserProfile;
}
export class CoreUser extends AggregateRoot<CoreUserProps> {
  private constructor(coreCredProps: CoreUserProps, id?: EntityID) {
    super(coreCredProps, id);
  }
  static register(
    coreCredProps: CoreUserProps,
    id?: EntityID,
  ): Result<CoreUser> {
    return Result.ok<CoreUser>(new CoreUser(coreCredProps, id));
  }
}
