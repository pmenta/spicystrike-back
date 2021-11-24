import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export class CreateTeamFounderColumn1637781226325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('teams', new TableColumn({ name: 'founder_id', type: 'uuid', isNullable: false }));
    await queryRunner.createForeignKey('teams', new TableForeignKey({
      referencedTableName: 'users',
      referencedColumnNames: ['id'],
      columnNames: ['founder_id'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('teams', 'founder_id');
    const table = await queryRunner.getTable('teams');
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('FKFounder') !== -1);
    await queryRunner.dropForeignKey('teams', foreignKey);
  }
}
