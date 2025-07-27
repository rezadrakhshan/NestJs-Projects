import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Customer,
  customerSchema,
} from '@app/customer/schemas/customer.schema';
import { Invoice, invoiceSchema } from './schemas/invoice.schema';
import { PdfModule } from '@app/pdf/pdf.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: customerSchema },
      { name: Invoice.name, schema: invoiceSchema },
    ]),
    PdfModule
  ],
  providers: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
