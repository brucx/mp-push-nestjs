import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
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

    return ;
  }
}
