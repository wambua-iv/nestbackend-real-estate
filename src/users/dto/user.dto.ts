import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserId {
  @IsNotEmpty()
  ID: string;
}
