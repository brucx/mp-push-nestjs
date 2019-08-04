import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User)
  @JoinColumn()
  owner: User;

  @ManyToMany(type => Channel, (user: User) => user.followChannels)
  @JoinTable()
  subscribers: User[];

  @Column({ length: 500 })
  name: string;
}
