import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreCredentialsRepo } from './core-credentials.repo';
import {
  MongoCoreCredentials,
  MongoCoreCredentialsSchema,
} from './Implementations/mongoose/models/mongoCoreCredentials';
import { MongoCoreCredentialsRepo } from './Implementations/mongoose/mongo-core-credentials.repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoCoreCredentials.name, schema: MongoCoreCredentialsSchema },
    ]),
  ],
  providers: [
    { provide: CoreCredentialsRepo, useClass: MongoCoreCredentialsRepo },
  ],
  exports: [CoreCredentialsRepo],
})
export class AuthRepoModule {}
