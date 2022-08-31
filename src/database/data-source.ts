import { DataSource } from 'typeorm';

export const AccountDataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  host: 'postgres',
  username: 'aluguel_nest',
  password: 'aluguel_nest',
  database: 'aluguel_nest',
  migrations: ['dist/database/migrations/**/*.{js,ts}'],
  entities: ['dist/**/*entity.{js,ts}'],
  synchronize: false,
});
