import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: 'localhost',
      username: 'aluguelNest',
      password: 'aluguelNest',
      database: 'aluguelNest',
      migrations: ['dist/database/migrations/**/*.{js,ts}'],
      entities: ['dist/**/*.entity.{js,ts}'],
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
