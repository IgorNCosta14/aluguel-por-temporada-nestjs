import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class address1655765108705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "address",
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
                    name: "zipCode",
                    type: "varchar",
                },
                {
                    name: "country",
                    type: "varchar",
                },
                {
                    name: "state",
                    type: "varchar",
                },
                {
                    name: "city",
                    type: "varchar",
                },
                {
                    name: "street",
                    type: "varchar",
                }
              ],
            })
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("address")
    }

}
