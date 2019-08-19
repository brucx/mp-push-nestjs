import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelModule } from './channel/channel.module';
import { UserModule } from './user/user.module';
import { WxModule } from './wx/wx.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ChannelModule,
    UserModule,
    WxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
