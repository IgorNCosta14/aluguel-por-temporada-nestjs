import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private repository: Repository<Address>,
  ) {}

  async create({
    zipCode,
    country,
    state,
    city,
    street,
  }: CreateAddressDto): Promise<Address> {
    const address = this.repository.create({
      zipCode,
      country,
      state,
      city,
      street,
    });

    await this.repository.save(address);

    return address;
  }

  async findByZipCode(zipCode: string): Promise<Address> {
    const address = await this.repository.findOne({ where: { zipCode } });

    return address;
  }

  async findById(id: number): Promise<Address> {
    const address = await this.repository.findOne({ where: { id } });

    return address;
  }

  async findAll(): Promise<Address[]> {
    const addresses = await this.repository.find();

    return addresses;
  }
}
