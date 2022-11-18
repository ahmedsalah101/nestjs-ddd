
import { User } from '../../domain';
import { UserRepo } from '../userRepo';

export class MongoUserRepo implements UserRepo {
  getUserByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getUserById(userId: string): Promise<User> {
    console.log(userId);
    return Promise.resolve(new User());
  }
  save(user: User): Promise<void> {
    return;
  }
}
