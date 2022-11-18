import { Module } from '@nestjs/common';
import { BasicCreditRepo } from './baiscCreditRepo';
import { MongoBasicCreditRepo } from './Implementations/mongoose/basicCredit.mongo.repo';
import {
  MongoUser,
  MongoUserSchema,
} from './Implementations/mongoose/models/mongoUser';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoUserRepo } from './Implementations/mongoose/user.mongo.repo';
import { UserRepo } from './userRepo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoUser.name, schema: MongoUserSchema },
    ]),
  ],
  providers: [
    { provide: UserRepo, useClass: MongoUserRepo },
    { provide: BasicCreditRepo, useClass: MongoBasicCreditRepo },
  ],
  exports: [UserRepo, BasicCreditRepo],
})
export class AuthRepoModule {}
