import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { Permission } from './users/permissions/entities/permission.entity';
import { PropertiesModule } from './properties/properties.module';
import { Address } from './properties/address/entities/address.entity';
import { Property } from './properties/entities/property.entity';
import { RentalsModule } from './rentals/rentals.module';
import { DateProviderService } from './utils/date-provider/date-provider.service';
import { Rental } from './rentals/entities/rental.entity';
import { PermissionsModule } from './users/permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/db.sqlite',
      synchronize: true,
      logging: true,
      entities: [User, Permission, Address, Property, Rental],
    }),
    UsersModule,
    PermissionsModule,
    PropertiesModule,
    RentalsModule,
  ],
  providers: [DateProviderService],
})
export class AppModule {}
