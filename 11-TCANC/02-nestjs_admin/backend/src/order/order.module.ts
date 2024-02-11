import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Module({
	imports: [CommonModule, TypeOrmModule.forFeature([Order, OrderItem])],
	controllers: [OrderController],
	providers: [OrderService],
})
export class OrderModule {}
