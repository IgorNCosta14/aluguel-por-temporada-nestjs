import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class PropertyFK1655769466960 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'properties',
            new TableForeignKey({
                columnNames: ['propertyAddressId'],
                referencedTableName: 'address',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('users', 'userPermission')
    }

}
