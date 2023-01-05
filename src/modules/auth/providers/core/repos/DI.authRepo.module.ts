import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreCredentialsRepo } from './abs.coreCred.repo';
import {
  MongoCoreCredentials,
  MongoCoreCredentialsSchema,
} from './Implementations/mongoose/schemas/mongo.coreCred';
import {
  MongoProfile,
  MongoProfileSchema,
} from './Implementations/mongoose/schemas/mongo.profile';
import { MongoCoreCredentialsRepo } from './Implementations/mongoose/mongo.coreCred.repo';
import { MongoProfileRepo } from './Implementations/mongoose/mongo.profile.repo';
import { ProfileRepo } from './abs.profile.repo';
import {
  CORE_CRED_MODEL_NAME,
  PROFILE_MODEL_NAME,
} from './Implementations/mongoose/constants';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CORE_CRED_MODEL_NAME, schema: MongoCoreCredentialsSchema },
      { name: PROFILE_MODEL_NAME, schema: MongoProfileSchema },
    ]),
  ],
  providers: [
    { provide: CoreCredentialsRepo, useClass: MongoCoreCredentialsRepo },
    { provide: ProfileRepo, useClass: MongoProfileRepo },
  ],
  exports: [CoreCredentialsRepo, ProfileRepo],
})
export class AuthRepoModule {}
