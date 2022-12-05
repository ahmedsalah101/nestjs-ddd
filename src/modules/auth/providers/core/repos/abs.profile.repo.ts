import { EntityID } from 'src/common/domain/EntityID';
import { UserProfile } from 'src/modules/auth/domain/profile';

export abstract class ProfileRepo {
  abstract save(profile: UserProfile): Promise<void>;
  abstract removeProfileById(profileId: EntityID): Promise<boolean>;
  abstract exists(profileId: string): Promise<boolean>;
  abstract getProfileById(profileId: string): Promise<UserProfile>;
}
