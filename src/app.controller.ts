import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user/:openid')
  login(@Param('openid') openid): Promise<User> {
    return this.userService.login(openid)
  }

  @Get('users')
  getUsers(): Promise<User[]> {
    return this.userService.findAll()
  }

}
