import { EitherFailOrVal, resFail, Result, resValue } from '@common/core';
import { Entity } from '../../../common/domain/Entity';
import { EntityID } from '../../../common/domain/EntityID';
import { z } from 'zod';
import { InvalidUserProfileError } from './profile.error';

interface UserProfileProps {
  firstName: string;
}
export class UserProfile extends Entity<UserProfileProps> {
  get profileId(): EntityID {
    return this._id;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  private constructor(userProfileProps: UserProfileProps, id?: EntityID) {
    super(userProfileProps, id);
  }

  static create(
    userProfileProps: UserProfileProps,
    id?: EntityID,
  ): EitherFailOrVal<InvalidUserProfileError, UserProfile> {
    const userProfileSchema = z.object({
      firstName: z
        .string()
        .max(10, { message: 'must be less than 10 chars' })
        .min(5),
    });
    const parseResult = userProfileSchema.safeParse(userProfileProps);
    if (parseResult.success === false)
      return resFail(
        new InvalidUserProfileError({ errMessage: parseResult.error.message }),
      );
    return resValue(new UserProfile(userProfileProps, id));
  }
}
