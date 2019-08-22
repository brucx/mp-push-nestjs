import { Controller, Param, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    ) {}

  @Get('user/:openid')
  login(@Param('openid') openid): Promise<User> {
    return this.userService.login(openid);
  }

  @Get('users')
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
