import { IsString, IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  phone?: string;
  
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
