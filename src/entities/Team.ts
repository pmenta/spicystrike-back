import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Generated,
} from 'typeorm';

import { User } from './User';

@Entity('teams')
class Team {
  @PrimaryColumn()
  @Generated('uuid')
  readonly id: string;

  @Column()
    name: string;

  @Column()
  readonly founder_id: string;

  @JoinColumn({ name: 'founder_id' })
  @ManyToOne(() => User)
    founder: User;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}

export { Team };
