import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class InvoiceItemDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  unitPrice: number;
}

export class CreateInvoiceDto {
  @IsMongoId()
  @IsNotEmpty()
  customerID: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];


  @IsString()
  @IsOptional()
  status?: 'draft' | 'sent' | 'paid' | 'overdue';

  @IsDateString()
  issueDate: string;

  @IsDateString()
  dueDate: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
