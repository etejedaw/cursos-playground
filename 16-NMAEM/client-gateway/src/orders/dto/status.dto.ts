import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../enums/order.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
