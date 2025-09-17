import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ContactStatus } from '../enum/contact.enum';

@Entity()
export class Contact extends BaseEntity {
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  subject: string;
  @Column('text')
  text: string;
  @Column({ type: 'enum', enum: ContactStatus, default: ContactStatus.PENDING })
  status: ContactStatus;
}
