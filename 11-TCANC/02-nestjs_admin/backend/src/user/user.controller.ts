import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	async all(): Promise<User[]> {
		return this.userService.all();
	}

	@Post()
	async create(@Body() body: UserCreateDto): Promise<User> {
		const password = await bcrypt.hash('1234', 12);
		return this.userService.create({
			firstName: body.firstName,
			lastName: body.lastName,
			email: body.email,
			password,
		});
	}

	@Get(':id')
	async get(@Param('id') id: number) {
		return this.userService.findOne({ id });
	}

	@Put('id')
	async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
		await this.userService.update(id, body);
		return this.userService.findOne({ id });
	}

	@Delete('id')
	async delete(@Param('id') id: number) {
		return this.userService.delete(id);
	}
}
