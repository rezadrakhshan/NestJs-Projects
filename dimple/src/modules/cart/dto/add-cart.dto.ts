import { IsArray, ValidateNested, IsInt, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

class CartItemDto {
  @IsString()
  productID: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class AddCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];
}
