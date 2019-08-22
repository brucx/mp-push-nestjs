import { Controller, Get, Post, Param } from '@nestjs/common';
import { Channel } from './channel.entity';
import { ChannelService } from './channel.service';

@Controller()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get('channels')
  getUsers(): Promise<Channel[]> {
    return this.channelService.findAll();
  }

  @Post('channel/:name')
  push(@Param('name') name): Promise<Channel> {
    return this.channelService.findByName(name);
  }
}
