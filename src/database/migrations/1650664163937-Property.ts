import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class property1650664163937 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "properties",
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                },
                {
                  name: "propertyName",
                  type: "varchar",
                },
                {
                  name: "description",
                  type: "varchar",
                },
                {
                  name: "propertyAddressId",
                  type: "int",
                },
                {
                  name: "propertyNumber",
                  type: "varchar",
                },
                {
                  name: "typeProperty",
                  type: "varchar",
                },
                {
                  name: "dailyRate",
                  type: "numeric",
                },
                {
                  name: "available",
                  type: "boolean",
                  default: true,
                },
                {
                  name: "createdAt",
                  type: "timestamp",
                  default: "now()",
                },
              ],
            })
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("properties");
    }

}
