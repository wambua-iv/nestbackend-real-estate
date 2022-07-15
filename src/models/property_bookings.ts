import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PropertyBookingsDocument = PropertyBookings & Document;

@Schema({ timestamps: true })
export class PropertyBookings {
  @Prop({ required: true })
  property_id: string;

  @Prop({ required: true })
  ID: string;

  @Prop({ required: true })
  amount: string;
}
export const PropertyBookingsSchema =
  SchemaFactory.createForClass(PropertyBookings);
