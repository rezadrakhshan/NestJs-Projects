import {
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsNumber,
  IsBoolean,
  IsOptional
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsDecimal()
  price: number;
  @IsOptional()
  @IsDecimal()
  discountPrice: number;
  @IsOptional()
  @IsNumber()
  stock: number;
  @IsOptional()
  @IsBoolean()
  isActive: boolean;
  @IsNotEmpty()
  @IsString()
  category: string;
}
