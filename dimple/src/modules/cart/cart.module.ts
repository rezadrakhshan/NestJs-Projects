import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entity/user.entity';
import { Product } from 'src/database/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
