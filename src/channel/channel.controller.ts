import { Controller, Get, Post, Param, Logger } from '@nestjs/common';
import { Channel } from './channel.entity';
import { ChannelService } from './channel.service';

@Controller()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('channels')
  getChannels(): Promise<Channel[]> {
    return this.channelService.findAll();
  }

  @Get('channel/:name')
  getChannelByName(@Param('name') name): Promise<Channel> {
    Logger.verbose(name)
    return this.channelService.findByName(name);
  }
}
