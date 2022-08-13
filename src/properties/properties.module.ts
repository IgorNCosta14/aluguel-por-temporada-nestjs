import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { AddressModule } from './address/address.module';
import { AddressService } from './address/address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Property]), AddressModule],
  controllers: [PropertiesController],
  providers: [PropertiesService, AddressService],
})
export class PropertiesModule {}
