import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './User';

interface IReady {
  id: string
  ready: boolean
}

@Entity('lobbys')
class Lobby {
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({
    type: 'jsonb',
    array: true,
    default: () => "'[]'",
    nullable: false,
  })
    team: User[];

  @Column({
    type: 'jsonb',
    array: true,
    default: () => "'[]'",
    nullable: false,
  })
    enemy_team: User[];

  @Column()
    status: number;

  @Column()
    gamemode: string;

  @Column({
    type: 'jsonb',
    array: true,
    default: () => "'[]'",
    nullable: false,
  })
    vetoes: string[];

  @Column({
    type: 'jsonb',
    array: true,
    default: () => "'[]'",
    nullable: false,
  })
    ready: IReady[];

  @Column()
    map?: string;

  @Column()
  readonly created_by: string;

  @JoinColumn({ name: 'created_by' })
  @ManyToOne(() => User)
    creator: User;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}

export { Lobby };
