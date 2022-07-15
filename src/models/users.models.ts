import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = Users & Document;

@Schema({ timestamps: true })
export class Users {
  @Prop({ type: Object, required: true })
  name: {
    firstname: string;
    lastname: string;
  };

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ unique: true })
  ID: number;

  @Prop({ unique: true, required: true })
  mobile: number;

  @Prop()
  hash: string;

  @Prop()
  TokenHash: string;

  @Prop({ type: Array })
  visits: [];

  @Prop({ type: Array })
  properties: [];
}

export const UserSchema = SchemaFactory.createForClass(Users);
