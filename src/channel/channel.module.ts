import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channel.entity';
import { ChannelService } from './channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  providers: [ChannelService],
  exports: [ChannelService],
})
export class ChannelModule {}
