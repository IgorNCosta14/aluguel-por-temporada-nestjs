import { DataSource } from 'typeorm';

export const AccountDataSource = new DataSource({
  type: 'sqlite',
  database: 'dist/db.sqlite',
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity.{js,ts}'],
  migrations: ['dist/database/migrations/**/*.{js,ts}'],
});
