import { IsString, IsOptional, IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Nice blog!' })
  @IsNotEmpty()
  @IsString()
  content: string;
  @ApiProperty({ example: '%7Bid%7D' })
  @IsNotEmpty()
  @IsMongoId()
  postID: string;
  @ApiProperty({ example: '%7Bid%7D', required: false })
  @IsOptional()
  @IsMongoId()
  parentID: string;
}
