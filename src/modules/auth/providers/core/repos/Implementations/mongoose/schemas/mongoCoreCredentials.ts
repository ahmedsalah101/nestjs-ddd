import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RawCoreCred } from '../../../../mappers/CredentialsMap';
import { MongoProfile, MongoProfileSchema } from './mongoProfile';

export type MongoCoreCredentialsDocument = MongoCoreCredentials & Document;
@Schema()
export class MongoCoreCredentials implements RawCoreCred {
  @Prop()
  _id: string;
  @Prop()
  email: string;
  //one to one so it could be embedded
  @Prop({ type: MongoProfileSchema })
  profile: MongoProfile;
  @Prop()
  hashedPassword: string;
}
export const MongoCoreCredentialsSchema =
  SchemaFactory.createForClass(MongoCoreCredentials);
MongoCoreCredentialsSchema.post('save', (doc) => {
  console.log(doc);
});
