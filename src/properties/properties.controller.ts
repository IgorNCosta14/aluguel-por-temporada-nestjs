import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { AddressService } from './address/address.service';
import { UpdatePropertyDto } from './dto/update-property.dto';

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

  @Get('zipCode')
  async listPropertiesByZipCode(@Query('zipCode') zipCode: string) {
    const addressId = await this.addressService.findByZipCode(zipCode);

    const property = await this.propertiesService.findPropertyByAddressId(
      addressId.id,
    );

    return property;
  }

  @Get('type')
  async listPropertiesByType(@Query('typeProperty') typeProperty: string) {
    const property = await this.propertiesService.findByTypeProperty(
      typeProperty,
    );

    return property;
  }

  @Get('userproperty')
  async findPropertyByOwner(@Request() req) {
    const properties = this.propertiesService.findPropertyByOwner(req.user.id);

    return properties;
  }

  @Patch(':id')
  async updateProperty(
    @Body()
    {
      propertyName,
      description,
      propertyNumber,
      typeProperty,
      dailyRate,
      lateFee,
    }: UpdatePropertyDto,
    @Request() req,
    @Param(':id') id: string,
  ) {
    const property = await this.propertiesService.findById(id);

    if (!property) {
      throw new Error('Property does not exist!');
    }

    if (property.propertyOwner != req.user.id) {
      throw new Error('User must be the owner of the property to update it!');
    }

    if (propertyName) {
      property.propertyName = propertyName;
    }

    if (description) {
      property.description = description;
    }

    if (propertyNumber) {
      property.propertyNumber = propertyNumber;
    }

    if (typeProperty) {
      property.typeProperty = typeProperty;
    }

    if (dailyRate) {
      property.dailyRate = dailyRate;
    }

    if (lateFee) {
      property.lateFee = lateFee;
    }

    property.updatedAt = new Date();

    await this.propertiesService.create(property);

    return property;
  }

  @Delete(':id')
  async remove(@Param('id') { id }, @Request() req) {
    const propertyExists = await this.propertiesService.findById(id);

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
