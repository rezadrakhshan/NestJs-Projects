import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'beautiful nature' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
