import { Module, HttpModule } from '@nestjs/common';
import { WxService } from './wx.service';
import { WxController } from './wx.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '../config/config.module';
import { ChannelModule } from '../channel/channel.module';

@Module({
  imports: [ConfigModule, HttpModule, UserModule, ChannelModule],
  providers: [WxService],
  controllers: [WxController],
  exports: [WxService],
})
export class WxModule {}
