import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Permission } from 'src/users/permissions/entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: __dirname + '/db.sqlite',
      synchronize: true,
      logging: true,
      entities: [User, Permission],
    }),
  ],
})
export class DatabaseModule {}
