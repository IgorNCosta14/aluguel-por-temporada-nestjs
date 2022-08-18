import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Delete,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
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
    @Request() req,
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
        propertyOwner: req.user.id,
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
        propertyOwner: req.user.id,
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

  @Delete(':id')
  async remove(@Param('id') { id }, @Request() req) {
    const propertyExists = await this.propertiesService.findById(id);

    console.log(id, req.user.id);

    if (!propertyExists) {
      throw new Error("Property doesn't exist!");
    }

    if (propertyExists.propertyOwner != req.user.id) {
      throw new Error('User must be the owner of the property to delete it!');
    }

    await this.propertiesService.delete(id);
    return;
  }
}
