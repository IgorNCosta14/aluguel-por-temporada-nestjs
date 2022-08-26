import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedPermissions1661546627508 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO permissions(id, name, "isLandlord", "isAdmin", "createdAt")
        values(1,'user', false, false, 'now()'),
        (2, 'landlord', true, false, 'now()'),
        (3, 'admin', false, true, 'now()')
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM permissions WHERE name=('user', 'landlord','admin')`,
    );
  }
}
