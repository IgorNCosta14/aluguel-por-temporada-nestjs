import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Permissions1655294980332 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "permissions",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        generationStrategy: 'identity',
                        generatedIdentity: 'ALWAYS',
                        isGenerated: true,
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "isLandlord",
                        type: "boolean"
                    },
                    {
                        name: "isAdmin",
                        type: "boolean"
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()",
    
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("permissions")
    }

}
