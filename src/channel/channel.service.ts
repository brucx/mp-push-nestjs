import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './channel.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class ChannelService {

  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  findAll(): Promise<Channel[]> {
    return this.channelRepository.find({relations: ['owner', 'subscribers']});
  }

  findByName(name: string): Promise<Channel> {
    return this.channelRepository.findOne({name});
  }

  /**
   * 将频道和用户绑定
   * @param channelName 频道名称
   * @param user 用户对象
   */
  async linkChannel(channelName: string, user: User): Promise<Channel> {
    const channel = await this.channelRepository.findOne({name: channelName}, {relations: ['subscribers']}) || await this.channelRepository.create({
      owner: user,
      name: channelName,
      subscribers: [],
    });
    if (!channel.subscribers.some(subscriber => subscriber.id === user.id)) {
      channel.subscribers.push(user);
    }
    return await this.channelRepository.save(channel);
  }
}
