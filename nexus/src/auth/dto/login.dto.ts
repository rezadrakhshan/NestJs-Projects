import { IsOptional, IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  username: string;
  @IsString()
  password: string;
}
