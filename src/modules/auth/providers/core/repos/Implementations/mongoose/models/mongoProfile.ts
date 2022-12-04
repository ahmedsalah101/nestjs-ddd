import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MongoProfileDocument = MongoProfile & Document;
@Schema()
export class MongoProfile {
  @Prop()
  profileId: string;
  @Prop()
  firstName: string;
}
export const MongoProfileSchema = SchemaFactory.createForClass(MongoProfile);
