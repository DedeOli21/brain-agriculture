import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddProducerIdToFarmTable1698326700000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Remover a tabela de junção, se existir
    const tableExists = await queryRunner.hasTable('producer_producer_farms');
    if (tableExists) {
      await queryRunner.dropTable('producer_producer_farms');
    }

    // Adicionar a coluna producerId na tabela farm
    await queryRunner.addColumn(
      'farm',
      new TableColumn({
        name: 'producerId',
        type: 'uuid',
        isNullable: true, // Pode ser ajustado para false após a migração
      }),
    );

    // Adicionar a chave estrangeira
    await queryRunner.createForeignKey(
      'farm',
      new TableForeignKey({
        columnNames: ['producerId'],
        referencedTableName: 'producer',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL', // Ou 'CASCADE', dependendo do comportamento desejado
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a chave estrangeira e a coluna
    await queryRunner.dropForeignKey('farm', 'FK_producerId'); // Nome da chave estrangeira pode variar
    await queryRunner.dropColumn('farm', 'producerId');
  }
}
