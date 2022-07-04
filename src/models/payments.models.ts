import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payments & Document;

@Schema({ timestamps: true })
export class Payments {
  @Prop({ required: true })
  property_id: string;

  @Prop({ required: true })
  tenantId: number;

  @Prop({ required: true })
  duration: string;

  @Prop()
  paymentMode: string;

  @Prop()
  payment: string;

  @Prop({ default: 'rent' })
  paymentFor: string;
}
export const PaymentSchema = SchemaFactory.createForClass(Payments);
