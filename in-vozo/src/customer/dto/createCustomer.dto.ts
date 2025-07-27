import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+981234567890' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'MicroSoft', required: false })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({ example: 'No. 25, Azadi Street, Tehran' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 1234567890 })
  @IsNumber()
  @IsNotEmpty()
  postalCode: number;

  @ApiProperty({ example: 'Iran' })
  @IsString()
  @IsNotEmpty()
  country: string;
}
