import { Injectable, NotFoundException } from '@nestjs/common';
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

  async updateCustomer(id, data, req) {
    const updated = await this.customerModel.findOneAndUpdate(
      {
        _id: id,
        userID: req.user.user,
      },
      data,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Customer does not exists');
    return updated;
  }

  async getCustomersList(req) {
    const result = await this.customerModel.find({ userID: req.user.user });
    return result;
  }
}
