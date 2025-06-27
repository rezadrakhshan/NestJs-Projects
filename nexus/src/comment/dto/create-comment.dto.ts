import { IsString, IsOptional, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsMongoId()
  postID: string;
  @IsOptional()
  @IsMongoId()
  parentID: string;
}
