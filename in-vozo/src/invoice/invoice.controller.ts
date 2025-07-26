import {
  Controller,
  Post,
  UsePipes,
  Req,
  Body,
  Get,
  ValidationPipe,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Request } from 'express';
import { CreateInvoiceDto } from './dto/createInvoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createInvoice(@Body() data: CreateInvoiceDto, @Req() req: Request) {
    return this.invoiceService.createInvoice(data, req);
  }

  @Get()
  async getInvoiceList(@Req() req: Request) {
    return this.invoiceService.getInvoiceList(req);
  }
}
