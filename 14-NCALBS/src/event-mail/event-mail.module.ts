import { MailerService } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDocument } from 'src/users/schema/user.schema';

@Module({})
export class EventMailModule {
  constructor(private readonly mailService: MailerService) {}

  @OnEvent('user.login')
  handleOrderCreatedEvent(user: any) {
    console.log('inicio_sesion', user);
  }

  @OnEvent('user.created')
  handlerUserCreatedEvent(user: UserDocument) {
    this.mailService.sendMail({
      to: user.email,
      subject: 'Bienvenido a esta App de NestJs',
      template: 'welcome',
      context: {
        name: user.name,
      },
    });
  }
}
