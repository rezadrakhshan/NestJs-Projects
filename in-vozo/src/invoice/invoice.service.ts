import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@app/auth/schemas/user.schema';
import { Customer } from '@app/customer/schemas/customer.schema';
import { Invoice } from './schemas/invoice.schema';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
  ) {}
}
