import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CoreCredentials } from 'src/modules/auth/domain';
export type MongoCoreCredentialsDocument = MongoCoreCredentials & Document;
@Schema()
export class MongoCoreCredentials implements CoreCredentials {
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