import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Blog } from './blog.entity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  title: string;

  @OneToMany(() => Blog, (blog) => blog.category)
  blogs: Blog[];
}
