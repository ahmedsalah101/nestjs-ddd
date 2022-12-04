import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityID } from 'src/common/domain/EntityID';
import { UserProfile } from 'src/modules/auth/domain/profile';
import { CoreCredentials } from '../../../domain/core.credentials';
import { Email } from '../../../domain/Email';
import { CoreCredMap } from '../../../mappers/CredentialsMap';
import { ProfileMap } from '../../../mappers/ProfileMap';
import { ProfileRepo } from '../../abs.profile.repo';
import { MongoProfile, MongoProfileDocument } from './schemas/mongoProfile';

export class MongoProfileRepo implements ProfileRepo {
  constructor(
    @InjectModel(MongoProfile.name)
    private readonly basicCreditModel: Model<MongoProfileDocument>,
  ) {}
  removeProfileById(profileId: EntityID): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  exists(profileId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async save(userProfile: UserProfile): Promise<void> {
    const rawProfile = ProfileMap.toMongoPersistence(userProfile);
    console.log(rawProfile);
    const profile = new this.basicCreditModel<MongoProfile>(rawProfile);
    await profile.save();
  }
}
