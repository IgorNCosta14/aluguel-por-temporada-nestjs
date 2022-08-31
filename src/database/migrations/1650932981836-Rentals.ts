import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Rentals1650932981836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "rentals",
              columns: [
                {
                  name: "id",
                  type: "uuid",
                  isPrimary: true,
                },
                {
                  name: "userId",
                  type: "uuid",
                },
                {
                  name: "propertyId",
                  type: "uuid",
                },
                {
                  name: "startDate",
                  type: "timestamp",
                  default: "now()",
                },
                {
                  name: "endDate",
                  type: "timestamp",
                  isNullable: true,
                },    
                {
                  name: "expectedReturnDate",
                  type: "timestamp",
                  isNullable: true,
                },                
                {
                  name: "totalRate",
                  type: "numeric",
                  isNullable: true,
                },
              ],
              foreignKeys: [
                {
                  name: "FKPropertyRental",
                  referencedTableName: "properties",
                  referencedColumnNames: ["id"],
                  columnNames: ["propertyId"],
                  onDelete: "SET NULL",
                  onUpdate: "SET NULL",
                },
                {
                  name: "FKUserRental",
                  referencedTableName: "users",
                  referencedColumnNames: ["id"],
                  columnNames: ["userId"],
                  onDelete: "SET NULL",
                  onUpdate: "SET NULL",
                },
              ],
            })
          )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rentals")
    }

}
