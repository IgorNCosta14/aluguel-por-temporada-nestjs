import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class removeDefaultValueFromRentalsStartDate1662065527445
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('rentals', 'startDate');

    await queryRunner.addColumn(
      'rentals',
      new TableColumn({
        name: 'startDate',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('rentals', 'startDate');

    await queryRunner.addColumn(
      'rentals',
      new TableColumn({
        name: 'startDate',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }
}
