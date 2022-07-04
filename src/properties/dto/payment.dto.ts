import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  @IsString()
  property_Id: string;

  @IsNotEmpty()
  @IsNumber()
  tenantId: number;

  @IsNotEmpty()
  @IsNumber()
  payment: number;

  @IsNotEmpty()
  @IsString()
  paymentMode: string;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsNotEmpty()
  @IsString()
  paymentFor: string;
}
