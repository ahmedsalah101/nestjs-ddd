import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreCredentialsRepo } from './abs.coreCred.repo';
import {
  MongoCoreCredentials,
  MongoCoreCredentialsSchema,
} from './Implementations/mongoose/schemas/mongoCoreCredentials';
import {
  MongoProfile,
  MongoProfileSchema,
} from './Implementations/mongoose/schemas/mongoProfile';
import { MongoCoreCredentialsRepo } from './Implementations/mongoose/mongo.coreCred.repo';
import { MongoProfileRepo } from './Implementations/mongoose/mongo.profile.repo';
import { ProfileRepo } from './abs.profile.repo';

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
