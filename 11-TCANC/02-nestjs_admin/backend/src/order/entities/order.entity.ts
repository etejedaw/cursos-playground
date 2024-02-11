import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity('orders')
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Exclude()
	firstName: string;

	@Column()
	@Exclude()
	lastName: string;

	@Column()
	email: string;

	@CreateDateColumn()
	created_at: string;

	@OneToMany(() => OrderItem, (orderItem) => orderItem.order)
	orderItems: OrderItem[];

	@Expose()
	get name(): string {
		return `${this.firstName} ${this.lastName}`;
	}

	@Expose()
	get total(): number {
		return this.orderItems.reduce(
			(sum, item) => sum + item.quantity * item.price,
			0,
		);
	}
}
