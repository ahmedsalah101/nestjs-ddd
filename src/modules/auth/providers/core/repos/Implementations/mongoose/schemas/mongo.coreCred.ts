import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EntityID } from 'src/common/domain/EntityID';
import { DomainEvents } from 'src/common/domain/events/DomainEvents';
import { RawCoreCred } from '../../../../mappers/CredentialsMap';
import { MongoProfile, MongoProfileSchema } from './mongo.profile';

export type MongoCoreCredentialsDocument = MongoCoreCredentials & Document;
@Schema()
export class MongoCoreCredentials implements RawCoreCred {
  @Prop()
  _id: string;
  @Prop()
  email: string;
  //one to one so it could be embedded
  @Prop({ type: String, ref: MongoProfile.name })
  profile: MongoProfile;
  @Prop()
  hashedPassword: string;
}
export const MongoCoreCredentialsSchema =
  SchemaFactory.createForClass(MongoCoreCredentials);
MongoCoreCredentialsSchema.post('save', (doc) => {
  console.log(doc);
  console.log(doc);
  const entityIDPraseResult = EntityID.parse(doc._id);
  if (entityIDPraseResult.isVal())
    DomainEvents.dispatchEventsForAggregate(entityIDPraseResult.value);
});
