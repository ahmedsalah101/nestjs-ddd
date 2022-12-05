import { EitherFailOrVal, resFail, Result, resValue } from '@common/core';
import { Entity } from '../../../common/domain/Entity';
import { EntityID } from '../../../common/domain/EntityID';
import { z } from 'zod';
import { InvalidUserProfileError } from './profile.error';

interface UserProfileProps {
  firstName: string;
}

type UserProfileResult = EitherFailOrVal<InvalidUserProfileError, UserProfile>;
export class UserProfile extends Entity<UserProfileProps> {
  get profileId(): EntityID {
    return this._id;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  //using EntityID as a type for id gurantees that id will be
  //valid everytime the object is created via constructor
  private constructor(userProfileProps: UserProfileProps, id: EntityID) {
    super(userProfileProps, id);
  }

  static parseProps(userProfileProps: UserProfileProps) {
    const userProfileSchema = z.object({
      firstName: z
        .string()
        .max(10, { message: 'must be less than 10 chars' })
        .min(5),
    });
    return userProfileSchema.safeParse(userProfileProps);
  }

  static create(usrProfPrps: UserProfileProps): UserProfileResult {
    const parseResult = this.parseProps(usrProfPrps);
    if (parseResult.success === false)
      return resFail(
        new InvalidUserProfileError({ errMessage: parseResult.error.message }),
      );
    return resValue(new UserProfile(usrProfPrps, EntityID.generate()));
  }

  static parse(usrProfPrps: UserProfileProps, id: string): UserProfileResult {
    const parseResult = this.parseProps(usrProfPrps);
    if (parseResult.success === false)
      return resFail(
        new InvalidUserProfileError({
          errMessage: 'Invalid User Profile Error',
          zodErrMessage: parseResult.error.message,
        }),
      );
    const profileId = EntityID.parse(id);
    if (profileId.isFail())
      return resFail(new InvalidUserProfileError({ errMessage: 'Invalid ID' }));

    return resValue(new UserProfile(usrProfPrps, profileId.value));
  }
}
