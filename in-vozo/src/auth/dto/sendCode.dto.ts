import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendCodeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  type: string;
}
