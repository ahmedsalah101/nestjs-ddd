import { Credentials } from './credentials';

export class CoreCredentials implements Credentials {
  email: string;
  hashedPassword: string;
  userId: string;
}
