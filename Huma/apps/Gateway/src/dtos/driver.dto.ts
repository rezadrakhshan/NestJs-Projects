import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

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

export class DriverVerifyOtpInputDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '+989000000000',
    description: 'Driver Phone Number',
  })
  @IsPhoneNumber('IR', { message: 'شماره تلفن معتبر وارد کنید' })
  phone: string;
  @ApiProperty({ example: '1234' })
  @IsString()
  @IsNotEmpty()
  @Length(4, 6)
  otp: string;
}
