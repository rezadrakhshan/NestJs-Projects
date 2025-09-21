import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/database/entity/product.entity';
import { User } from 'src/database/entity/user.entity';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { In } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async addCart(data, req) {
    const productIds = data.items.map((item) => item.productID);

    const products = await this.productRepository.find({
      where: { id: In(productIds) },
    });

    if (products.length !== productIds.length) {
      throw new NotFoundException('Some products not found.');
    }
    const cart = await this.cacheManager.get(`${req.user.sub}`);
    if (cart) await this.cacheManager.del(`${req.user.sub}`);
    await this.cacheManager.set(`${req.user.sub}`, data.items);
    return {
      message: 'Cart updated successfully.',
      items: data.items,
    };
  }
}
