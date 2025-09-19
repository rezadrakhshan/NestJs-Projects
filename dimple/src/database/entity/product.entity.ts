import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductCategory } from './product-category.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  title: string;
  @Column('text')
  description: string;
  @Column()
  thumbnail: string;
  @Column('simple-array')
  images: string[];
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountPrice: number;
  @Column({ default: 0 })
  stock: number;
  @Column({ default: true })
  isActive: boolean;
  @ManyToOne(() => ProductCategory, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  category: ProductCategory;
}
