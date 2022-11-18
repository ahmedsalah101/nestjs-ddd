import { User } from '../domain';

export abstract class UserRepo {
  abstract save(user: User): Promise<void>;
  abstract getUserById(userId: string): Promise<User>;
  abstract getUserByEmail(email: string): Promise<User>;
}
