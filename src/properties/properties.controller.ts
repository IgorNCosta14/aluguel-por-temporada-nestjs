import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { AddressService } from './address/address.service';

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly addressService: AddressService,
  ) {}

  @Post()
  async create(
    @Body()
    {
      propertyName,
      description,
      zipCode,
      typeProperty,
      dailyRate,
      country,
      state,
      city,
      street,
      propertyNumber,
      lateFee,
    }: CreatePropertyDto,
    propertyOwner: 'test',
  ) {
    if (dailyRate <= 0) {
      throw new Error('Daily rate must be greater than zero!');
    }

    const address = await this.addressService.findByZipCode(zipCode);

    if (!address) {
      await this.addressService.create({
        zipCode,
        country,
        state,
        city,
        street,
      });

      const address = await this.addressService.findByZipCode(zipCode);

      const property = await this.propertiesService.create({
        propertyName,
        description,
        typeProperty,
        propertyOwner,
        propertyAddressId: address.id,
        propertyNumber,
        dailyRate,
        lateFee,
      });

      return property;
    } else {
      const property = await this.propertiesService.create({
        propertyName,
        description,
        typeProperty,
        propertyOwner,
        propertyAddressId: address.id,
        propertyNumber,
        dailyRate,
        lateFee,
      });

      return property;
    }
  }

  @Get()
  async listProperties() {
    const properties = await this.propertiesService.listAvailableProperty();
    return properties;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.propertiesService.findOne(+id);
  // }

  // @Get('/zipCode')
  // findOne(@Param('id') id: string) {
  //   return this.propertiesService.findOne(+id);
  // }

  // @Get('/type')
  // findOne(@Param('id') id: string) {
  //   return this.propertiesService.findOne(+id);
  // }

  // @Get('/userproperty')
  // findOne(@Param('id') id: string) {
  //   return this.propertiesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePropertyDto: UpdatePropertyDto,
  // ) {
  //   return this.propertiesService.update(+id, updatePropertyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.propertiesService.remove(+id);
  // }
}
