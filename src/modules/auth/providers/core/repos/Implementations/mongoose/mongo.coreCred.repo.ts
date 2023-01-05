import { Nothing, Optional } from '@common/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreCredentials } from '../../../domain/core.credentials';
import { Email } from '../../../domain/Email';
import { CoreCredMap } from '../../../mappers/CredentialsMap';
import { CoreCredentialsRepo } from '../../abs.coreCred.repo';
import { ProfileRepo } from '../../abs.profile.repo';
import { CORE_CRED_MODEL_NAME } from './constants';
import {
  MongoCoreCredentials,
  MongoCoreCredentialsDocument,
} from './schemas/mongo.coreCred';

export class MongoCoreCredentialsRepo implements CoreCredentialsRepo {
  constructor(
    @InjectModel(CORE_CRED_MODEL_NAME)
    private readonly basicCreditModel: Model<MongoCoreCredentialsDocument>,
    private readonly profileRepo: ProfileRepo,
  ) {}
  exists(credId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async getCreditByEmail(email: Email): Promise<Optional<CoreCredentials>> {
    const rawCred = await this.basicCreditModel
      .findOne<MongoCoreCredentials>({
        email: email.toString(),
      })
      .exec();
    const rawCredFound = !!rawCred;
    if (rawCredFound) return CoreCredMap.toDomain(rawCred);
    return null as Nothing;
  }

  private async rollBackSave(credentials: CoreCredentials) {
    console.log('RolledBack');
    const isRemoved = await this.profileRepo.removeProfileById(
      credentials.profile.profileId,
    );
    await this.basicCreditModel
      .deleteOne({ _id: credentials.id.toString() })
      .exec();
    //this.basicCreditModel.remove({})
  }
  async save(credentials: CoreCredentials): Promise<void> {
    try {
      const rawCoreCred =
        CoreCredMap.toPersistence<MongoCoreCredentials>(credentials);
      await this.profileRepo.save(credentials.profile);
      const cred = new this.basicCreditModel(rawCoreCred);
      await cred.save();
    } catch (error) {
      console.log(error);
      this.rollBackSave(credentials);
    }
  }
}