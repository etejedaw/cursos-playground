import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('permission')
export class PermissionController {
	constructor(private permissionService: PermissionService) {}

	@Get()
	async all() {
		return this.permissionService.all();
	}

	@Post()
	async create(@Body('name') name: string) {
		return this.permissionService.create({ name });
	}
}
