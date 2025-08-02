import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Request } from 'express';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { UpdateCustomerDto } from './dto/updateCustomer.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createCustomer(@Body() data: CreateCustomerDto, @Req() req: Request) {
    return this.customerService.createCustomer(data, req);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateCustomer(
    @Param('id') id: string,
    @Body() data: UpdateCustomerDto,
    @Req() req: Request,
  ) {
    return this.customerService.updateCustomer(id, data, req);
  }

  @Get()
  async getCustomersList(@Req() req: Request) {
    return this.customerService.getCustomersList(req);
  }
}
