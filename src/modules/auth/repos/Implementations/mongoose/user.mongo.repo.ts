import { User } from '../../../domain';
import { UserRepo } from '../../userRepo';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoUser, MongoUserDocument } from './models/mongoUser';
export class MongoUserRepo implements UserRepo {
  constructor(
    @InjectModel(MongoUser.name)
    private readonly userModel: Model<MongoUserDocument>,
  ) {}
  getUserByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  getUserById(userId: string): Promise<User> {
    console.log(userId);
    return Promise.resolve(new User());
  }
  async save(user: User): Promise<void> {
    const mongoUser = new this.userModel(user);
    await mongoUser.save();
    return;
  }
}
