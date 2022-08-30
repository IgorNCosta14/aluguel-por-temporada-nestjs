import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Property } from './entities/property.entity';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private repository: Repository<Property>,
  ) {}

  async create({
    id,
    propertyName,
    description,
    propertyOwner,
    propertyAddressId,
    propertyNumber,
    typeProperty,
    available,
    dailyRate,
    createdAt,
    updatedAt,
    lateFee,
  }: CreatePropertyDto): Promise<Property> {
    const property = this.repository.create({
      id,
      propertyName,
      description,
      propertyOwner,
      propertyAddressId,
      propertyNumber,
      typeProperty,
      available,
      dailyRate,
      createdAt,
      updatedAt,
      lateFee,
    });

    await this.repository.save(property);

    return property;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async listAvailableProperty(): Promise<Property[]> {
    const allProperties = await this.repository.find({
      where: { available: true },
      relations: ['address'],
    });

    return allProperties;
  }

  async updateAvailableState({
    id,
    available,
  }: UpdatePropertyDto): Promise<void> {
    const property = await this.repository.findOne({ where: { id } });

    property.available = available;

    await this.repository.save(property);
  }

  async findById(id: string): Promise<Property> {
    const property = await this.repository.findOne({
      where: { id: id },
      relations: ['address'],
    });
    return property;
  }

  async findByTypeProperty(typeProperty: string): Promise<Property[]> {
    const property = await this.repository.find({
      where: { typeProperty: typeProperty },
      relations: ['address'],
    });

    return property;
  }

  async findPropertyByAddressId(
    propertyAddressId: number,
  ): Promise<Property[]> {
    const property = await this.repository.find({
      where: { propertyAddressId: propertyAddressId },
      relations: ['address'],
    });
    return property;
  }

  async findPropertyByOwner(propertyOwner: string): Promise<Property[]> {
    const property = await this.repository.find({
      where: { propertyOwner: propertyOwner },
      relations: ['address'],
    });
    return property;
  }
}
