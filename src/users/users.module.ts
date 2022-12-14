import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UtilsService } from 'src/utils/utils.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Permission } from './permissions/entities/permission.entity';
import { CheckAuthenticatesMiddleware } from 'src/middlewares/CheckAuthenticates.middleware';
import { CheckAdminMiddleware } from 'src/middlewares/CheckAdmin.middleware';
import { PermissionsService } from './permissions/permissions.service';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission]), PermissionsModule],
  controllers: [UsersController],
  providers: [UsersService, UtilsService, PermissionsService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthenticatesMiddleware, CheckAdminMiddleware)
      .exclude(
        { path: 'users', method: RequestMethod.POST },
        { path: 'users/sessions', method: RequestMethod.POST },
      )
      .forRoutes(UsersController);
  }
}
