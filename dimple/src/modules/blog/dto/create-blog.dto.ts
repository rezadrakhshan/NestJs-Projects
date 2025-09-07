import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  categoryID: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
