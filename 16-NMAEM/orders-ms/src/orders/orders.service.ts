import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { ChangeOrderStatusDto } from './dto';
import { PRODUCT_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) {
    super();
  }

  private readonly logger = new Logger('OrdersService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Connected');
  }

  async create(createOrderDto: CreateOrderDto) {
    try {
      const productIds = createOrderDto.items.map((item) => item.productId);
      const products = await firstValueFrom(
        this.productClient.send({ cmd: 'validate_products' }, productIds),
      );

      const totalAmount = products.reduce((acc, val) => {
        const id = val.id;
        const orderItem = createOrderDto.items.find(
          (item) => item.productId === id,
        );

        const price = val.price;
        const quantity = orderItem.quantity;

        const total = price * quantity;

        return (acc += total);
      }, 0);

      const totalItems = createOrderDto.items
        .map((item) => item.quantity)
        .reduce((total, value) => total + value, 0);

      const order = await this.order.create({
        data: {
          totalAmount,
          totalItems,
          OrderItem: {
            createMany: {
              data: createOrderDto.items.map((orderItem) => {
                return {
                  productId: orderItem.productId,
                  price: products.find(
                    (product) => product.id === orderItem.productId,
                  ).price,
                  quantity: orderItem.quantity,
                };
              }),
            },
          },
        },
        include: {
          OrderItem: {
            select: { price: true, quantity: true, productId: true },
          },
        },
      });

      return {
        ...order,
        OrderItem: order.OrderItem.map((orderItem) => {
          return {
            ...orderItem,
            name: products.find((product) => product.id === orderItem.productId)
              .name,
          };
        }),
      };

      return { totalAmount, totalItems };
    } catch (error: any) {
      throw new RpcException(error);
    }
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {
    const totalPages = await this.order.count({
      where: { status: orderPaginationDto.status },
    });
    const currentPage = orderPaginationDto.page;
    const perPage = orderPaginationDto.limit;

    return {
      data: await this.order.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        where: { status: orderPaginationDto.status },
      }),
      meta: {
        total: totalPages,
        page: currentPage,
        lastPage: Math.ceil(totalPages / perPage),
      },
    };
  }

  async findOne(id: string) {
    const order = await this.order.findFirst({
      where: { id },
      include: {
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            productId: true,
          },
        },
      },
    });
    if (!order)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Order with id ${id} not found`,
      });

    const productIds = order.OrderItem.map((oderItem) => oderItem.productId);
    const products = await firstValueFrom(
      this.productClient.send({ cmd: 'validate_products' }, productIds),
    );

    return {
      ...order,
      OrderItem: order.OrderItem.map(
        (orderItem) =>
          ({
            ...orderItem,
            name: products.find(
              (product) => product.id === orderItem.productId,
            ),
          }).name,
      ),
    };
  }

  async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeOrderStatusDto;

    const order = await this.findOne(id);
    if (order.status === status) return order;

    return this.order.update({
      where: { id },
      data: { status },
    });
  }
}
