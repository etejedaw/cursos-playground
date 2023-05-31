import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reset } from './entities/reset.entity';
import { ResetInterface } from './interfaces/reset.interface';

@Injectable()
export class ResetService {
  constructor(
    @InjectRepository(Reset)
    private readonly resetRepository: Repository<Reset>,
  ) {}

  async create(reset: ResetInterface): Promise<ResetInterface> {
    return await this.resetRepository.save(reset);
  }

  async findOne(condition: any): Promise<Reset> {
    return await this.resetRepository.findOne({ where: condition });
  }
}
