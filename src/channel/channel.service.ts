import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './channel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelService {

  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  findAll(): Promise<Channel[]> {
    return this.channelRepository.find();
  }

  findByName(name): Promise<Channel> {
    return this.channelRepository.findOne({name});
  }
}
