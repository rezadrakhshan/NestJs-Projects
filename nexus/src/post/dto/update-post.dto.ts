import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ example: 'beautiful nature', required: false })
  @IsOptional()
  @IsString()
  content?: string;
}
