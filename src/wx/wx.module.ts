import { Module, HttpModule } from '@nestjs/common';
import { WxService } from './wx.service';
import { WxController } from './wx.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule, HttpModule, UserModule],
  providers: [WxService],
  controllers: [WxController],
})
export class WxModule {}
