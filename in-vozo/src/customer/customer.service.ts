import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Customer } from './schemas/customer.schema';
import { pick } from 'lodash';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  async createCustomer(data, req): Promise<Customer> {
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

  async updateCustomer(id, data, req): Promise<Customer> {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid ID');
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

  async getCustomersList(req): Promise<Customer[]> {
    const result = await this.customerModel.find({ userID: req.user.user });
    return result;
  }

  async removeCustomer(id, req): Promise<{ msg: string }> {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid ID');
    const deleted = await this.customerModel.findOneAndDelete({
      _id: id,
      userID: req.user.user,
    });
    if (!deleted) throw new NotFoundException('Cutomer does not exists');
    return { msg: 'Customer removed' };
  }
}
