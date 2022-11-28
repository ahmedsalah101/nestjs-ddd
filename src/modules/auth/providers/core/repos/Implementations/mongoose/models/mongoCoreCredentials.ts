import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MongoCoreCredentialsDocument = MongoCoreCredentials & Document;
@Schema()
export class MongoCoreCredentials {
  @Prop()
  email: string;
  @Prop()
  userId: string;
  @Prop()
  hashedPassword: string;
}
export const MongoCoreCredentialsSchema =
  SchemaFactory.createForClass(MongoCoreCredentials);
MongoCoreCredentialsSchema.post('save', (doc) => {
  console.log(doc);
});
