
import { Credentials } from '../../domain';
import { BasicCreditRepo } from '../baiscCreditRepo';
import { UserRepo } from '../userRepo';

export class MongoBasicCreditRepo implements BasicCreditRepo {
  getCreditByEmail(email: string): Promise<Credentials.BasicCredentials> {
    throw new Error('Method not implemented.');
  }

  save(credentials: Credentials.BasicCredentials): Promise<void> {
    return;
  }
}
