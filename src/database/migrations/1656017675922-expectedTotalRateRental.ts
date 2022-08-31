import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class expectedTotalRateRental1656017675922 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "rentals", 
            new TableColumn({
                name: "expectedTotalRate",
                type: "int",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("rentals", "expectedTotalRate")
    }

}
