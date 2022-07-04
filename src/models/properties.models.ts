import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertiesDocument = Properties & Document;

@Schema({ timestamps: true })
export class Properties {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  ownerId: number;

  @Prop()
  status: string;

  @Prop()
  approval: string;

  @Prop({ type: Array, default: null })
  amenities: [];

  @Prop({ type: Array })
  tenants: [];

  @Prop({ type: Array })
  visits: [];
}

export const PropertiesSchema = SchemaFactory.createForClass(Properties);
