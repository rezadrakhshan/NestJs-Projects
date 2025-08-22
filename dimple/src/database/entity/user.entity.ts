import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';
import { Role } from '../enum/role.enum';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  phone: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;
  
  @Column({ nullable: false })
  password: string;

}
