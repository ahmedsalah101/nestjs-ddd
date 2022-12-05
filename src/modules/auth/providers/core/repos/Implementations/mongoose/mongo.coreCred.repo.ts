import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityID } from 'src/common/domain/EntityID';
import { CoreCredentials } from '../../../domain/core.credentials';
import { Email } from '../../../domain/Email';
import { CoreCredMap } from '../../../mappers/CredentialsMap';
import { ProfileMap } from '../../../mappers/ProfileMap';
import { CoreCredentialsRepo } from '../../abs.coreCred.repo';
import { ProfileRepo } from '../../abs.profile.repo';
import {
  MongoCoreCredentials,
  MongoCoreCredentialsDocument,
} from './schemas/mongoCoreCredentials';

export class MongoCoreCredentialsRepo implements CoreCredentialsRepo {
  constructor(
    @InjectModel(MongoCoreCredentials.name)
    private readonly basicCreditModel: Model<MongoCoreCredentialsDocument>,
    private readonly profileRepo: ProfileRepo,
  ) {}
  exists(credId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async getCreditByEmail(email: Email): Promise<CoreCredentials> {
    const rawCred = await this.basicCreditModel
      .findOne<MongoCoreCredentials>({
        email: email.toString(),
      })
      .exec();
    return CoreCredMap.toDomain(rawCred);
  }

  private async rollBackSave(credentials: CoreCredentials) {
    console.log('RolledBack');
    //await this.ProfileRepo.removeProfileById(credentials.profile.profileId);
    //this.basicCreditModel.remove({})
  }
  async save(credentials: CoreCredentials): Promise<void> {
    try {
      const rawCoreCred =
        CoreCredMap.toPersistence<MongoCoreCredentials>(credentials);
      const cred = new this.basicCreditModel(rawCoreCred);
      await cred.save();
    } catch (error) {
      console.log(error);
      this.rollBackSave(credentials);
    }
  }
}
