import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return await firstValueFrom(
        this.productClient.send({ cmd: 'create' }, createProductDto),
      );
    } catch (error: any) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productClient.send({ cmd: 'find_all' }, paginationDto);
  }

  @Get(':id')
  async findProductById(@Param('id') id: string) {
    try {
      return await firstValueFrom(
        this.productClient.send({ cmd: 'find' }, { id }),
      );
    } catch (error: any) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await firstValueFrom(
        this.productClient.send({ cmd: 'delete' }, { id }),
      );
    } catch (error: any) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      return await firstValueFrom(
        this.productClient.send({ cmd: 'update' }, { id, ...updateProductDto }),
      );
    } catch (error: any) {
      throw new RpcException(error);
    }
  }
}
