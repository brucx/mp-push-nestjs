import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Channel } from '../channel/channel.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  openid: string;

  @ManyToMany(type => Channel, (channel: Channel) => channel.subscribers)
  @JoinTable()
  followChannels: Channel[];

  @OneToMany(type => Channel, (channel: Channel) => channel.owner)
  ownChannels: Channel[];
}
