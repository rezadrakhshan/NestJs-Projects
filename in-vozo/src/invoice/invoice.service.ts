import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '@app/customer/schemas/customer.schema';
import { Invoice } from './schemas/invoice.schema';
import { pick } from 'lodash';
import mongoose from 'mongoose';
import { PdfService } from '@app/pdf/pdf.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
    private readonly pdfGenerator: PdfService,
  ) {}

  async createInvoice(data, req) {
    const { customerID, items } = data;

    if (!mongoose.Types.ObjectId.isValid(customerID)) {
      throw new BadRequestException('Invalid customerID');
    }

    const customer = await this.customerModel.findById(customerID);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const invoiceData: any = pick(data, [
      'customerID',
      'items',
      'status',
      'issueDate',
      'dueDate',
      'notes',
    ]);

    invoiceData.userID = req.user.user;
    invoiceData.total = items.reduce((sum, item) => {
      return sum + item.unitPrice * item.quantity;
    }, 0);

    const createdInvoice = await this.invoiceModel.create(invoiceData);
    return createdInvoice;
  }

  async getInvoiceList(req) {
    return this.invoiceModel.find({ userID: req.user.user });
  }

  async generatePdf(res, id, req) {
    const invoice = await this.invoiceModel.findOne({
      _id: id,
      userID: req.user.user,
    });
    if (!invoice) throw new NotFoundException('Invoice does not exists');
    const pdfBuffer = await this.pdfGenerator.generatePdf(invoice);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="sample.pdf"',
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }
}
