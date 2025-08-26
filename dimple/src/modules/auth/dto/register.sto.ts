import { IsString, IsEmail, IsNumber, IsNotEmpty } from 'class-validator';
import { Role } from 'src/database/enum/role.enum';

export class RegisterDto {
  @IsNotEmpty()
  @IsNumber()
  code: number;
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  role: Role = Role.USER;
}
