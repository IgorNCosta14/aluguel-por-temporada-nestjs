import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PropertiesModule } from './properties/properties.module';
import { RentalsModule } from './rentals/rentals.module';
import { DateProviderService } from './utils/date-provider/date-provider.service';
import { PermissionsModule } from './users/permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: 'postgres',
      username: 'aluguel_nest',
      password: 'aluguel_nest',
      database: 'aluguel_nest',
      migrations: ['dist/database/migrations/**/*.{js,ts}'],
      entities: ['dist/**/*entity.{js,ts}'],
      synchronize: false,
    }),
    UsersModule,
    PermissionsModule,
    PropertiesModule,
    RentalsModule,
  ],
  providers: [DateProviderService],
})
export class AppModule {}
