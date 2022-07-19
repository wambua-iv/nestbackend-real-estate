import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  property_name: string;

  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsString()
  additional_information: string;

  @IsObject()
  contact_information: {
    email: string;
    name: string;
    phone_number: number;
  };

  @IsArray()
  images: [];

  @IsNumber()
  price: number;

  @IsObject()
  amenities: {
    washroom: string;
    bedrooms: string;
  };
}

export class PropertyTypeDto {
  @IsNotEmpty()
  @IsString()
  type: string;
}

export class PropertyOwnerDto {
  @IsNotEmpty()
  @IsString()
  property_registration: string;

  @IsNotEmpty()
  @IsNumber()
  ID: number;
}

export class PropertyIdDto {
  @IsString()
  _id: string;
}

export class TenantDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
