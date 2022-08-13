import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { UtilsService } from './utils/utils.service';
import { PermissionsModule } from './users/permissions/permissions.module';
import { Permission } from './users/permissions/entities/permission.entity';
import { PropertiesModule } from './properties/properties.module';
import { Address } from './properties/address/entities/address.entity';
import { Property } from './properties/entities/property.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/db.sqlite',
      synchronize: true,
      logging: true,
      entities: [User, Permission, Address, Property],
    }),
    UsersModule,
    PermissionsModule,
    PropertiesModule,
  ],
  providers: [UtilsService],
})
export class AppModule {}
