import { User, Credentials } from '../domain';

export abstract class BasicCreditRepo {
  abstract save(credentials: Credentials.BasicCredentials): Promise<void>;
  abstract getCreditByEmail(
    email: string,
  ): Promise<Credentials.BasicCredentials>;
}
