import { Module } from '@nestjs/common';
import { WxService } from './wx.service';
import { WxController } from './wx.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [WxService],
  controllers: [WxController],
})
export class WxModule {}
