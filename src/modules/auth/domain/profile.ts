import { Result } from '@common/core';
import { Entity } from '../../../common/domain/Entity';
import { EntityID } from '../../../common/domain/EntityID';
import { z } from 'zod';

interface UserProfileProps {
  firstName: string;
}
export class UserProfile extends Entity<UserProfileProps> {
  get userId(): EntityID {
    return this._id;
  }

  private constructor(userProfileProps: UserProfileProps, id?: EntityID) {
    super(userProfileProps, id);
  }

  static create(
    userProfileProps: UserProfileProps,
    id?: EntityID,
  ): Result<UserProfile> {
    const userProfileSchema = z.object({
      firstName: z.string().max(10, { message: 'must be less than 10 chars' }),
    });

    const parseResult = userProfileSchema.safeParse(userProfileProps);

    if (parseResult.success === true) {
      return Result.ok<UserProfile>(new UserProfile(userProfileProps, id));
    }

    return Result.fail<UserProfile>(parseResult.error.flatten().formErrors);
  }
}

const resultProfile: Result<UserProfile> = UserProfile.create({
  firstName: 's',
});

console.log(
  resultProfile.isSuccess,
  resultProfile.successValue.userId.toString(),
);
