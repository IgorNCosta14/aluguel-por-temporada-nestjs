import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedPermissions1661546627508 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO permissions(id, name, "isLandlord", "isAdmin", "createdAt")
        values(default,'user', false, false, 'now()'),
        (default, 'landlord', true, false, 'now()'),
        (default, 'admin', false, true, 'now()')
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM permissions WHERE name=('user', 'landlord','admin')`,
    );
  }
}
