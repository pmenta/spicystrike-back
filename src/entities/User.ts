import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

interface IPlainUser {
  name: string;
  id: string;
}

@Entity('users')
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
    name: string;

  @Exclude()
  @Column()
    password: string;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}

export { User, IPlainUser };
