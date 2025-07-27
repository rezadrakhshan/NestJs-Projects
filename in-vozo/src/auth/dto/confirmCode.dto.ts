import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmCodeDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsNumber()
  @IsNotEmpty()
  code: number;
}
