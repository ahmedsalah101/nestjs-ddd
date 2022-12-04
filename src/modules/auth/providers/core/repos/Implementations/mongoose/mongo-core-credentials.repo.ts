import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreCredentials } from '../../../domain/core.credentials';
import { Email } from '../../../domain/Email';
import { CoreCredMap } from '../../../mappers/CredentialsMap';
import { ProfileMap } from '../../../mappers/ProfileMap';
import { CoreCredentialsRepo } from '../../core-credentials.abs.repo';
import { ProfileRepo } from '../../profile.repo';
import {
  MongoCoreCredentials,
  MongoCoreCredentialsDocument,
} from './models/mongoCoreCredentials';
import { MongoProfile, MongoProfileDocument } from './models/mongoProfile';

export class MongoCoreCredentialsRepo implements CoreCredentialsRepo {
  constructor(
    @InjectModel(MongoCoreCredentials.name)
    private readonly basicCreditModel: Model<MongoCoreCredentialsDocument>,
    private readonly ProfileRepo: ProfileRepo,
  ) {}
  exists(credId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  getCreditByEmail(email: Email): Promise<CoreCredentials> {
    console.log('HEEERE');

    throw new Error('Method not implemented.');
  }

  private async rollBackSave(credentials: CoreCredentials) {
    await this.ProfileRepo.removeProfileById(credentials.profile.profileId);
    //this.basicCreditModel.remove({})
  }
  async save(credentials: CoreCredentials): Promise<void> {
    try {
      await this.ProfileRepo.save(credentials.profile);
      const rawCoreCred = CoreCredMap.toPersistence(credentials);
      const cred = new this.basicCreditModel<MongoCoreCredentials>(rawCoreCred);
      await cred.save();
    } catch (error) {
      this.rollBackSave(credentials);
    }
  }
}
