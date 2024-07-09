import { Module } from '@nestjs/common';
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { NATS_SERVICE, envs } from 'src/config';

const natsClientConfig = {
  name: NATS_SERVICE,
  transport: Transport.NATS,
  options: { servers: envs.NATS_SERVERS },
} as ClientProviderOptions;

@Module({
  imports: [ClientsModule.register([natsClientConfig])],
  exports: [ClientsModule.register([natsClientConfig])],
})
export class NatsModule {}
