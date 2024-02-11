import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
	constructor(
		@InjectRepository(Permission)
		private readonly premissionRepository: Repository<Permission>,
	) {}

	all(): Promise<Permission[]> {
		return this.premissionRepository.find();
	}

	create(data): Promise<Permission> {
		return this.premissionRepository.save(data);
	}
}
