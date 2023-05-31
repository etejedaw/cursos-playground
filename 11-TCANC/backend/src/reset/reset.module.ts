import { Module } from '@nestjs/common';
import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reset } from './entities/reset.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reset]),
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: '9bf0eeb65826b2',
          pass: '1a5cd5f0091a8a',
        },
        defaults: {
          from: 'no-replay@localhost.com',
        },
      },
    }),
    AuthModule,
  ],
  providers: [ResetService],
  controllers: [ResetController],
})
export class ResetModule {}
