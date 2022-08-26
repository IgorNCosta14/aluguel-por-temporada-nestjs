import { MigrationInterface, QueryRunner } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

export class seedAdmin1661546697509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const id = await uuidV4();
    const password = await hash('1234', 8);
    const createdAt = new Date();

    await queryRunner.query(
      `INSERT INTO USERS(id, name, password, email, cpf, "userPermission", "activeUser","createdAt")
        values('${id}', 'admin', '${password}', 'admin@admin.com', 'xxxxxxxxxxx', 3, true, '${createdAt}')
    `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM USERS WHERE name='admin'`);
  }
}
