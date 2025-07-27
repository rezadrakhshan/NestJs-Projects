import {
  Controller,
  Post,
  UsePipes,
  Req,
  Res,
  Param,
  Body,
  Get,
  ValidationPipe,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Request, Response } from 'express';
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

  @Get('pdf/:id')
  async pdfGenerator(
    @Res() res: Response,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    return this.invoiceService.generatePdf(res, id,req);
  }
}
