import { User } from 'src/modules/auth/domain';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type MongoUserDocument = MongoUser & Document;
@Schema()
export class MongoUser implements User {
  @Prop()
  firstName: string;
}

export const MongoUserSchema = SchemaFactory.createForClass(MongoUser);
