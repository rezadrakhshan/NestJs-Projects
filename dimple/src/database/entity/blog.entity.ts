import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { BlogStatus } from '../enum/status.enum';

@Entity()
export class Blog extends BaseEntity {
  @Column()
  title: string;
  @Column('text')
  content: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ default: 0 })
  views: number;

  @Column({ type: 'enum', enum: BlogStatus, default: BlogStatus.DRAFT })
  status: BlogStatus;
  
  @ManyToOne(() => User, (user) => user.blogs, { onDelete: 'CASCADE' })
  author: User;
}
