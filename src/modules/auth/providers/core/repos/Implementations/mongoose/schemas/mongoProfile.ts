import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RawProfile } from '../../../../mappers/ProfileMap';

export type MongoProfileDocument = MongoProfile & Document;
@Schema()
export class MongoProfile implements RawProfile {
  @Prop()
  _id: string;
  @Prop()
  firstName: string;
}
export const MongoProfileSchema = SchemaFactory.createForClass(MongoProfile);
