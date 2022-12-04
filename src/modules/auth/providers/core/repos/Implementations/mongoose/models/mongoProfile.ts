import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MongoProfileDocument = MongoProfile & Document;
@Schema()
export class MongoProfile {
  @Prop()
  email: string;
  @Prop()
  profileId: string;
  @Prop()
  hashedPassword: string;
}
export const MongoProfileSchema = SchemaFactory.createForClass(MongoProfile);
