import { Controller, Get } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { validRoles } from '../auth/enums/valid-roles.enum';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  executeSeed() {
    return this.seedService.runSeed();
  }
}
