import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { CommonModule } from 'src/common/common.module';

@Module({
	imports: [UserModule, CommonModule],
	controllers: [AuthController],
	providers: [],
})
export class AuthModule {}
