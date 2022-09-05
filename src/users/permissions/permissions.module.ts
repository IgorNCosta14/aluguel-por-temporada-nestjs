import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permission } from './entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckAuthenticatesMiddleware } from 'src/middlewares/CheckAuthenticates.middleware';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), UsersModule],
  controllers: [PermissionsController],
  providers: [PermissionsService, UsersService],
})
export class PermissionsModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(CheckAuthenticatesMiddleware)
  //     .forRoutes(PermissionsController);
  // }
}
