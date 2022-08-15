import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UtilsService } from 'src/utils/utils.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Permission } from './permissions/entities/permission.entity';
import { CheckAuthenticatesMiddleware } from 'src/middlewares/CheckAuthenticates.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  controllers: [UsersController],
  providers: [UsersService, UtilsService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthenticatesMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
