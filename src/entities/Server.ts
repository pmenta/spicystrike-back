import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('servers')
class Server {
  @PrimaryColumn()
  readonly id: string;

  @Column()
    hostname: string;

  @Column()
    key_filename: string;

  @Column()
    ip: string;

  @Column()
    password: string;

  @Column()
    status: number; // 0 Livre || 1 Em jogo

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}

export { Server };
