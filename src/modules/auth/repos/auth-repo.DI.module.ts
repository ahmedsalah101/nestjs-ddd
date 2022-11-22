import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Test2EventHandler,
  TestEventHandler,
} from '../domain/handlers/testEventHandler';
import { CoreCredentialsRepo } from './core-credentials.abs.repo';
import {
  MongoCoreCredentials,
  MongoCoreCredentialsSchema,
} from './Implementations/mongoose/models/mongoCoreCredentials';
import { MongoCoreCredentialsRepo } from './Implementations/mongoose/mongo-core-credentials.repo';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: MongoCoreCredentials.name, schema: MongoCoreCredentialsSchema },
    ]),
  ],
  providers: [
    { provide: CoreCredentialsRepo, useClass: MongoCoreCredentialsRepo },
    Test2EventHandler,
    TestEventHandler,
  ],
  exports: [CoreCredentialsRepo],
})
export class AuthRepoModule {}
