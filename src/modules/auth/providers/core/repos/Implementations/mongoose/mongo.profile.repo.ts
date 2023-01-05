import { Optional } from '@common/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityID } from 'src/common/domain/EntityID';
import { UserProfile } from 'src/modules/auth/domain/profile';
import { ProfileMap } from '../../../mappers/ProfileMap';
import { ProfileRepo } from '../../abs.profile.repo';
import { PROFILE_MODEL_NAME } from './constants';
import { MongoProfile, MongoProfileDocument } from './schemas/mongo.profile';

export class MongoProfileRepo implements ProfileRepo {
  constructor(
    @InjectModel(PROFILE_MODEL_NAME)
    private readonly profileModel: Model<MongoProfileDocument>,
  ) {}
  async removeProfileById(profileId: EntityID): Promise<boolean> {
    const result = await this.profileModel
      .deleteOne({
        _id: profileId.toString(),
      })
      .exec();
    if (!result) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }
  exists(profileId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async getProfileById(profileId: string): Promise<Optional<UserProfile>> {
    const rawProfile = await this.profileModel
      .findOne<MongoProfile>({ _id: profileId })
      .exec();

    const profile = UserProfile.parse(
      { firstName: rawProfile.firstName },
      profileId,
    );
    if (profile.isFail()) return null;
    return profile.value;
  }
  async save(userProfile: UserProfile): Promise<void> {
    const rawProfile = ProfileMap.toPersistence<MongoProfile>(userProfile);
    const profile = new this.profileModel<MongoProfile>(rawProfile);
    await profile.save();
  }
}