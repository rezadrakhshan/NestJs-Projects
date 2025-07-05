import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'jogn_doe' })
  @IsString()
  username: string;
  @ApiProperty({ example: 'john' })
  @IsString()
  firstName: string;
  @ApiProperty({ example: 'doe' })
  @IsString()
  lastName: string;
  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;
}
