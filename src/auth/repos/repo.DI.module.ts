import { Module } from '@nestjs/common';
import { BasicCreditRepo } from './baiscCreditRepo';
import { MongoBasicCreditRepo } from './Implementations/basicCredit.mongo.repo';
import { MongoUserRepo } from './Implementations/user.mongo.repo';
import { UserRepo } from './userRepo';

@Module({
  imports: [],
  providers: [
    { provide: UserRepo, useClass: MongoUserRepo },
    { provide: BasicCreditRepo, useClass: MongoBasicCreditRepo },
  ],
  exports: [UserRepo, BasicCreditRepo],
})
export class UserRepoModule {}
