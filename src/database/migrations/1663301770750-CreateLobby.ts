import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLobby1663301770750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lobbys',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'team',
            type: 'jsonb',
          },
          {
            name: 'enemy_team',
            type: 'jsonb',
          },
          {
            name: 'status',
            type: 'integer',
            default: '0',
          },
          {
            name: 'gamemode',
            type: 'varchar',
          },
          {
            name: 'vetoes',
            type: 'jsonb',
          },
          {
            name: 'ready',
            type: 'jsonb',
          },
          {
            name: 'map',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_by',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKLobbyCreator',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['created_by'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('lobbys');
  }
}
