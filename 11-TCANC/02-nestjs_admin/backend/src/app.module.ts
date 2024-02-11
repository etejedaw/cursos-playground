import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionGuard } from './permission/permission.guard';

@Module({
	imports: [
		UserModule,
		TypeOrmModule.forRoot({
			type: 'mariadb',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: 'toor',
			database: 'mariadb',
			autoLoadEntities: true,
			synchronize: true,
		}),
		AuthModule,
		CommonModule,
		RoleModule,
		PermissionModule,
		ProductModule,
		OrderModule,
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: PermissionGuard,
		},
	],
})
export class AppModule {}
