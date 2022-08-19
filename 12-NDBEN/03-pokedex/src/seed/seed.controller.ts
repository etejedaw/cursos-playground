import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';

@Controller('seed')
export class SeedController {
  private readonly axios: AxiosInstance;
  constructor(private readonly seedService: SeedService) {
    this.axios = axios;
  }

  @Get()
  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    );
    data.results.forEach((pokemon) => {
      const segments = pokemon.url.split('/');
      const no = Number(segments.at(-2)) as number;
      console.log({ name: pokemon.name, no });
    });
    return data.results;
  }
}
