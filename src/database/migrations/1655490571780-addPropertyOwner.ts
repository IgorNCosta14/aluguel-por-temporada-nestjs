import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addPropertyOwner1655490571780 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "properties", 
            new TableColumn({
                name: "propertyOwner",
                type: "uuid"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("properties", "propertyOwner")
    }

}
