import {
  Controller,
  Post,
  UsePipes,
  Req,
  Res,
  Param,
  Put,
  Delete,
  Body,
  Get,
  ValidationPipe,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Request, Response } from 'express';
import { CreateInvoiceDto } from './dto/createInvoice.dto';
import { UpdateInvoiceDto } from './dto/updateInvoice.dto';
import { Invoice } from './schemas/invoice.schema';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createInvoice(
    @Body() data: CreateInvoiceDto,
    @Req() req: Request,
  ): Promise<Invoice> {
    return this.invoiceService.createInvoice(data, req);
  }

  @Get()
  async getInvoiceList(@Req() req: Request): Promise<Invoice[]> {
    return this.invoiceService.getInvoiceList(req);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateInvoice(
    @Param('id') id: string,
    @Body() data: UpdateInvoiceDto,
    @Req() req: Request,
  ): Promise<Invoice> {
    return this.invoiceService.updateInvoice(id, data, req);
  }

  @Get('pdf/:id')
  async pdfGenerator(
    @Res() res: Response,
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    return this.invoiceService.generatePdf(res, id, req);
  }

  @Delete(':id')
  async removeInvoice(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<{ msg: string }> {
    return this.invoiceService.removeInvoice(id, req);
  }
}
