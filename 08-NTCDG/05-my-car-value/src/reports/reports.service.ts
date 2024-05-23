import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reports } from './reports.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Reports)
    private readonly reportsRepository: Repository<Reports>,
  ) {}

  create(createReportDto: CreateReportDto, user: User) {
    const report = this.reportsRepository.create(createReportDto);
    report.user = user;
    return this.reportsRepository.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reportsRepository.findOne({
      where: { id },
    });
    if (!report) throw new NotFoundException('Report not found');

    report.approved = approved;
    return this.reportsRepository.save(report);
  }

  async createEstimate(estimateDto: GetEstimateDto) {
    return this.reportsRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make: estimateDto.make })
      .andWhere('model = :model', { model: estimateDto.model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: estimateDto.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lng: estimateDto.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { lng: estimateDto.year })
      .andWhere('approved IS TRUE')
      .orderBy('mileage - :mileage', 'DESC')
      .setParameters({ mileage: estimateDto.mileage })
      .limit(3)
      .getRawOne();
  }
}
