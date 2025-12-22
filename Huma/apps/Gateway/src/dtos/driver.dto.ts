import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class DriverRequestOtpDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '+989000000000',
    description: 'Driver Phone Number',
  })
  @IsPhoneNumber('IR', { message: 'شماره تلفن معتبر وارد کنید.' })
  phone: string;
}
