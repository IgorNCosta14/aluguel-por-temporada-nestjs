import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { User } from 'src/users/entities/user.entity';
import { DateProviderService } from 'src/utils/date-provider/date-provider.service';
import { PropertiesService } from 'src/properties/properties.service';
import { PropertiesModule } from 'src/properties/properties.module';
import { UsersModule } from 'src/users/users.module';
import { Property } from 'src/properties/entities/property.entity';
import { CheckAuthenticatesMiddleware } from 'src/middlewares/CheckAuthenticates.middleware';
import { UsersService } from 'src/users/users.service';
import { CheckLandLordMiddleware } from 'src/middlewares/CheckLandLord.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental, User, Property]),
    PropertiesModule,
    UsersModule,
  ],
  controllers: [RentalsController],
  providers: [
    RentalsService,
    PropertiesService,
    DateProviderService,
    UsersService,
  ],
})
export class RentalsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckAuthenticatesMiddleware).forRoutes(RentalsController);
    consumer.apply(CheckLandLordMiddleware).forRoutes({
      path: 'rentals/devolution/',
      method: RequestMethod.PATCH,
    });
  }
}
