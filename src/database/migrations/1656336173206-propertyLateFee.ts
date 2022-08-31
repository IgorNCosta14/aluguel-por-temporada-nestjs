import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class propertyLateFee1656336173206 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'properties',
            new TableColumn({
                name: "lateFee",
                type: "int",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("properties", "lateFee")
    }

}
