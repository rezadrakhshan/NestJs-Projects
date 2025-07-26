import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Request } from 'express';
import { CreateCustomerDto } from './dto/createCustomer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createCustomer(@Body() data: CreateCustomerDto, @Req() req: Request) {
    return this.customerService.createCustomer(data, req);
  }

  @Get()
  async getCustomersList(@Req() req: Request) {
    return this.customerService.getCustomersList(req);
  }
}
