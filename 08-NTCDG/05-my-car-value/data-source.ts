import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceProvide = {
  provide: DataSource,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<DataSourceOptions> => ({
    type: 'sqlite',
    database: configService.get('DB_NAME'),
    entities: ['**/*.entity.js'],
    synchronize: ['test', 'development'].includes(
      configService.get<string>('NODE_ENV'),
    ),
    dropSchema: configService.get<string>('NODE_ENV') === 'test',
  }),
  dataSourceFactory: async (
    options: DataSourceOptions,
  ): Promise<DataSource> => {
    return await new DataSource(options).initialize();
  },
};
