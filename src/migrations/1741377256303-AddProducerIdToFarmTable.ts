import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddProducerIdToFarmTable1741377256303
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionar a coluna producerId na tabela farm
    await queryRunner.addColumn(
      'farm',
      new TableColumn({
        name: 'producer',
        type: 'uuid',
        isNullable: true, // Pode ser ajustado para false após a migração
      }),
    );

    // Adicionar a chave estrangeira
    await queryRunner.createForeignKey(
      'farm',
      new TableForeignKey({
        columnNames: ['producer'],
        referencedTableName: 'producer',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL', // Ou 'CASCADE', dependendo do comportamento desejado
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a chave estrangeira e a coluna
    await queryRunner.dropForeignKey('farm', 'FK_producer'); // Nome da chave estrangeira pode variar
    await queryRunner.dropColumn('farm', 'producer');
  }
}
