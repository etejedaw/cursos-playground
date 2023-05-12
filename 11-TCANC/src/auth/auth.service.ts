import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(user: UserInterface): Promise<UserInterface> {
    return await this.userRepository.save(user);
  }

  async findOneBy(condition: any): Promise<UserInterface> {
    return this.userRepository.findOne(condition);
  }
}
