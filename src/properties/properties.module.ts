import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { AddressModule } from './address/address.module';
import { AddressService } from './address/address.service';
import { Address } from './address/entities/address.entity';
import { CheckAuthenticatesMiddleware } from 'src/middlewares/CheckAuthenticates.middleware';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { CheckLandLordMiddleware } from 'src/middlewares/CheckLandLord.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, Address, User]),
    AddressModule,
    UsersModule,
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService, AddressService, UsersService],
})
export class PropertiesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthenticatesMiddleware, CheckLandLordMiddleware)
      .exclude(
        { path: 'properties/zipCode', method: RequestMethod.GET },
        { path: 'properties/type', method: RequestMethod.GET },
        { path: 'properties/', method: RequestMethod.GET },
      )
      .forRoutes(PropertiesController);
  }
}
