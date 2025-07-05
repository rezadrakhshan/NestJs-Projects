import { IsOptional, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'john_doe', required: false })
  @IsOptional()
  @IsString()
  username: string;
  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;
}
