import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertiesDocument = Properties & Document;

@Schema({ timestamps: true })
export class Properties {
  @Prop({ required: true })
  property_name: string;

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
  additional_information: string;

  @Prop({ type: Object })
  contact_information: {
    email: string;
    name: string;
    phone_number: number;
  };

  @Prop({ type: Object })
  amenities: {
    washroom: string;
    bedrooms: string;
  };

  @Prop()
  images: [];

  @Prop()
  approval: string;

  @Prop({ type: Array })
  tenants: [];

  @Prop({ type: Array })
  visits: [];
}

export const PropertiesSchema = SchemaFactory.createForClass(Properties);
