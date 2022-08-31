import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class rentalTotalLateFee1656532806650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'rentals',
            new TableColumn({
                name: "totalLateFee",
                type: "int",
                isNullable: true,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('rentals', 'totalLateFee')
    }

}
