import { Credentials } from 'src/modules/auth/domain';
import { BasicCreditRepo } from '../../baiscCreditRepo';

export class MongoBasicCreditRepo implements BasicCreditRepo {
  getCreditByEmail(email: string): Promise<Credentials.BasicCredentials> {
    throw new Error('Method not implemented.');
  }

  save(credentials: Credentials.BasicCredentials): Promise<void> {
    return;
  }
}
