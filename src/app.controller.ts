import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { WxService } from './wx/wx.service';
import { ConfigService } from './config/config.service';
import { ChannelService } from './channel/channel.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly wxService: WxService,
    private readonly configService: ConfigService,
    private readonly channelService: ChannelService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('push')
  async push(@Body() body) {
    Logger.verbose(body);
    const { channelName, text } = body;
    if (!channelName || !text) {
      return {
        error: 1,
        message: 'Bad params!',
      };
    }
    const channel = await this.channelService.findByName(channelName);
    if (!channel) {
      return {
        error: 1,
        message: 'Channel not exist!',
      };
    }
    channel.subscribers.forEach(user => {
      this.wxService.send({
        template_id: this.configService.WX_TEMPLATE_ID,
        touser: user.openid,
        data: {
          first: {
            value: text,
          },
        },
      });
    });

    return {
      error: 0,
      message: `Sending ${channel.subscribers.length} msg...`,
    };
  }
}
