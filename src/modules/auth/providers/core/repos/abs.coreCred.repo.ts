import { CoreCredentials } from '../domain/core.credentials';
import { Email } from '../domain/Email';

export abstract class CoreCredentialsRepo {
  abstract getCreditByEmail(email: Email): Promise<CoreCredentials>;
  abstract save(coreCredentails: CoreCredentials): Promise<void>;
  abstract exists(credId: string): Promise<boolean>;
}
