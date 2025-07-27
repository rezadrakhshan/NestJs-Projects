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
import { ApiProperty } from '@nestjs/swagger';

class InvoiceItemDto {
  @ApiProperty({ example: 'Website design service' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 150 })
  @IsNumber()
  @Min(0)
  unitPrice: number;
}

export class CreateInvoiceDto {
  @ApiProperty({ example: '6884a66cda5c3af381aa36fa' })
  @IsMongoId()
  @IsNotEmpty()
  customerID: string;

  @ApiProperty({ type: InvoiceItemDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items: InvoiceItemDto[];

  @ApiProperty({ example: 'sent', required: false })
  @IsString()
  @IsOptional()
  status?: 'draft' | 'sent' | 'paid' | 'overdue';

  @ApiProperty({ example: '2025-07-23T00:00:00.000+00:00' })
  @IsDateString()
  issueDate: string;

  @ApiProperty({ example: '2025-08-01T00:00:00.000+00:00' })
  @IsDateString()
  dueDate: string;

  @ApiProperty({
    example: 'Please make the payment before the due date.',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
