import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class ConfirmCodeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  code: number;
}
