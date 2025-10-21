import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  username: string;
  @Column({unique:true})
  email:string
  @Column({ nullable: true })
  avatarUrl: string;
  @Column()
  password: string;
  @Column('text', { nullable: true })
  bio: string;
  @Column({ default: false })
  isOnline: boolean;
  @Column({ nullable: true })
  socketID: string;
  @Column({ nullable: true })
  lastSeen: Date;
}
