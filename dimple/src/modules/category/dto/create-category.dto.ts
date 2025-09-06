import { IsString, IsNotEmpty } from 'class-validator';

export class createCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
