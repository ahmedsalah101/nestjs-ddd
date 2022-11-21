import { CoreCredentials } from '../domain';

export abstract class CoreCredentialsRepo {
  abstract getCreditByEmail(email: string): Promise<CoreCredentials>;
  abstract save(coreCredentails: CoreCredentials): Promise<void>;
}
