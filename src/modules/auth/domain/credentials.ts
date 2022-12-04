import { AggregateRoot } from 'src/common/domain/AggregateRoot';
import { UserProfile } from './profile';

export interface CredentialsProps {
  profile: UserProfile;
}

export class Credentials<T extends CredentialsProps> extends AggregateRoot<T> {}
