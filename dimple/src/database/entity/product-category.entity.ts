import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity()
export class ProductCategory extends BaseEntity {
  @Column()
  title: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
