import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class userFK1655335907724 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'users',
            new TableForeignKey({
                columnNames: ['userPermission'],
                referencedTableName: 'permissions',
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
