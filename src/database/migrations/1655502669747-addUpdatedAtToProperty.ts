import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addUpdatedAtToProperty1655502669747 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "properties", 
            new TableColumn({
                name: "updatedAt",
                type: "timestamp",
                default: "now()"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("properties", "updatedAt")
    }

}
