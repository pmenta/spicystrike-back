import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Team } from './Team';

@Entity('users')
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
    name: string;

  @Exclude()
  @Column()
    email: string;

  @Column()
    team_id: string;

  @JoinColumn({ name: 'team_id' })
  @ManyToOne(() => Team)
    team: Team;

  @Exclude()
  @Column()
    password: string;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}

export { User };
