import { Entity,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";

@Entity()
export class BaseEntity{
	@PrimaryGeneratedColumn()
	id:number
	@CreateDateColumn({type:"timestamp"})
	readonly createdAt !: Date

	@UpdateDateColumn({type:"timestamp"})
	readonly updatedAt !: Date

}
