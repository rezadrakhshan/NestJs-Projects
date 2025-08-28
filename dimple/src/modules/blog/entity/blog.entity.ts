import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/database/entity/user.entity';
import { BaseEntity } from 'src/database/entity/base.entity';
import { BlogStatus } from 'src/database/enum/status.enum';

@Entity()
export class Blog extends BaseEntity {
  @Column({ nullable: false, length: 100 })
  title: string;
  @Column({ nullable: false })
  content: string;
  @Column({ nullable: false, length: 500 })
  excerpt: string;
  @ManyToOne(() => User, (user) => user.blogs)
  @JoinColumn({ name: 'authorID' })
  author: User;
  @Column({ type: 'enum', enum: BlogStatus, default: BlogStatus.DRAFT })
  status: BlogStatus;
}
