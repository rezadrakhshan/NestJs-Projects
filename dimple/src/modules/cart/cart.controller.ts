import {
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Body,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';
import { AddCartDto } from './dto/add-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  
  @Post()
  @UsePipes(new ValidationPipe())
  async addCart(@Body() data: AddCartDto, @Req() req: Request) {
    return this.cartService.addCart(data, req);
  }
}
