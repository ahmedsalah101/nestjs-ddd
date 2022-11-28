import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CoreCredentialsRepo } from '../../core-credentials.abs.repo';
import {
  MongoCoreCredentials,
  MongoCoreCredentialsDocument,
} from './models/mongoCoreCredentials';

export class MongoCoreCredentialsRepo implements CoreCredentialsRepo {
  constructor(
    @InjectModel(MongoCoreCredentials.name)
    private readonly basicCreditModel: Model<MongoCoreCredentialsDocument>,
  ) {}
  exists(credId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  getCreditByEmail(email: string): Promise<MongoCoreCredentials> {
    console.log('HEEERE');

    throw new Error('Method not implemented.');
  }

  async save(credentials: MongoCoreCredentialsDocument): Promise<void> {
    const cred = new this.basicCreditModel(credentials);
    await cred.save();
  }
}
