import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	ClassSerializerInterceptor,
	UseGuards,
	Res,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Parser } from 'json2csv';
import { Response } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	create(@Body() createOrderDto: CreateOrderDto) {
		return this.orderService.create(createOrderDto);
	}

	@Get()
	findAll() {
		return this.orderService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.orderService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
		return this.orderService.update(+id, updateOrderDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.orderService.remove(+id);
	}

	@Post('export')
	async export(@Res() response: Response) {
		const parser = new Parser({
			fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity'],
		});
		const orders = await this.orderService.findAll();

		const json = [];

		orders.forEach((order) => {
			json.push({
				ID: order.id,
				Name: order.name,
				Email: order.email,
				'Product Title': '',
				Price: '',
				Quantity: '',
			});
			order.orderItems.forEach((orderItem) => {
				json.push({
					ID: '',
					Name: '',
					Email: '',
					'Product Title': orderItem.productTitle,
					Price: orderItem.price,
					Quantity: orderItem.quantity,
				});
			});
		});

		const csv = parser.parse(json);
		response.header('Content-Type', 'text/csv');
		response.attachment('order.csv');
		return response.send(csv);
	}

	@Get('chart')
	async chart() {
		return this.orderService.chart();
	}
}
