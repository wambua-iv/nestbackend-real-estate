import { IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';

export class VisitationDto {
  @IsNotEmpty()
  @IsString()
  property_Id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  ID: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  time: string;
}
