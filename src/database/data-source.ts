import { DataSource } from 'typeorm';

export const AccountDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: 'aluguelNest',
  port: 5432,
  username: 'aluguelNest',
  password: 'aluguelNest',
  database: 'aluguelNest',
  entities: ['dist/**/*.entity.{js,ts}'],
  migrations: ['dist/database/migrations/**/*.{js,ts}'],
  synchronize: false,
});
