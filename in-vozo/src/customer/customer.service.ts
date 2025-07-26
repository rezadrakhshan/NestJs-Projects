import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from './schemas/customer.schema';
import { pick } from 'lodash';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async createCustomer(data, req) {
    const value = pick(data, [
      'fullname',
      'email',
      'phone',
      'company',
      'address',
      'postalCode',
      'country',
    ]);

    const result = await this.customerModel.create({
      ...value,
      userID: req.user.user,
    });
    return result;
  }

  async getCustomersList(req) {
    const result = await this.customerModel.find({ userID: req.user.user });
    return result;
  }
}
