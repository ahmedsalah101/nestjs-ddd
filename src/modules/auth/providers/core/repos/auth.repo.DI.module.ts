import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreCredentialsRepo } from './core-credentials.abs.repo';
import {
  MongoCoreCredentials,
  MongoCoreCredentialsSchema,
} from './Implementations/mongoose/models/mongoCoreCredentials';
import {
  MongoProfile,
  MongoProfileSchema,
} from './Implementations/mongoose/models/mongoProfile';
import { MongoCoreCredentialsRepo } from './Implementations/mongoose/mongo-core-credentials.repo';
import { MongoProfileRepo } from './Implementations/mongoose/mongo-profile.repo';
import { ProfileRepo } from './profile.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoCoreCredentials.name, schema: MongoCoreCredentialsSchema },
      { name: MongoProfile.name, schema: MongoProfileSchema },
    ]),
  ],
  providers: [
    { provide: CoreCredentialsRepo, useClass: MongoCoreCredentialsRepo },
    { provide: ProfileRepo, useClass: MongoProfileRepo },
  ],
  exports: [CoreCredentialsRepo, ProfileRepo],
})
export class AuthRepoModule {}
