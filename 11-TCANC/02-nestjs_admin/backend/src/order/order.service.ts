import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
	constructor(
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
	) {}

	create(createOrderDto: CreateOrderDto) {
		return this.orderRepository.save(createOrderDto);
	}

	findAll() {
		return this.orderRepository.find();
	}

	findOne(id: number) {
		return this.orderRepository.findOne({ where: { id } });
	}

	update(id: number, updateOrderDto: UpdateOrderDto) {
		return this.orderRepository.update(id, updateOrderDto);
	}

	remove(id: number) {
		return this.orderRepository.delete(id);
	}

	async chart() {
		return this.orderRepository.query(`
			SELECT DATE_FORMAT(o.create_at, '%Y-%m-%d') as date, sum(i.price*i.quantity) as sum
			FROM orders o
			JOIN order_item i ON o.id = i.order_id
			GROUP BY date;
		`);
	}
}
