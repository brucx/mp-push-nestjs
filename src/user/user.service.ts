import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(openid: string): Promise<User> {
    let user = await this.userRepository.findOne({ openid }) || await this.userRepository.save({ openid });
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
