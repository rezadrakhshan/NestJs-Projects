import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '@app/auth/schemas/user.schema';
import {
  Customer,
  customerSchema,
} from '@app/customer/schemas/customer.schema';
import { Invoice, invoiceSchema } from './schemas/invoice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: Customer.name, schema: customerSchema },
      { name: Invoice.name, schema: invoiceSchema },
    ]),
  ],
  providers: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
