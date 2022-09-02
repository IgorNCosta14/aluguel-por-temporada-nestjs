import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Repository, IsNull, Not } from 'typeorm';
import { Rental } from './entities/rental.entity';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private repository: Repository<Rental>,
  ) {}

  async create({
    id,
    propertyId,
    userId,
    totalRate,
    totalLateFee,
    startDate,
    expectedReturnDate,
    expectedTotalRate,
    endDate,
  }: CreateRentalDto): Promise<Rental> {
    const rental = this.repository.create({
      id,
      propertyId,
      userId,
      totalRate,
      totalLateFee,
      startDate,
      expectedReturnDate,
      expectedTotalRate,
      endDate,
    });

    await this.repository.save(rental);
    return rental;
  }

  async startRental(id: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update('rentals')
      .set({ startDate: 'now()' })
      .where('id=:id', { id })
      .returning('*')
      .execute();
  }

  async list(): Promise<Rental[]> {
    const rentals = await this.repository.find({
      relations: ['property', 'user'],
    });
    return rentals;
  }

  async findRentalByUserId(userId: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { userId },
      relations: ['property', 'user'],
    });

    return rentals;
  }

  async findRentalByPropertyId(propertyId: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { propertyId } });
    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ where: { id } });
    return rental;
  }

  async findUserRentals(id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { userId: id },
      relations: ['property', 'user'],
    });
    return rentals;
  }

  async listFinishedRentals(): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { endDate: Not(IsNull()) },
      relations: ['property', 'user'],
    });
    return rentals;
  }

  async listRentalsInProgress(): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { endDate: IsNull(), startDate: Not(IsNull()) },
      relations: ['property', 'user'],
    });
    return rentals;
  }

  async listLandLordRentalsInProgress(id: string): Promise<Rental[]> {
    const rentals = await this.repository
      .createQueryBuilder('rentals')
      .innerJoinAndSelect('rentals.property', 'property')
      .where({ endDate: IsNull(), startDate: Not(IsNull()) })
      .andWhere('property.propertyOwner = :id', { id })
      .getMany();

    return rentals;
  }

  async listLandLordRentalsFinished(id: string): Promise<Rental[]> {
    const rentals = await this.repository
      .createQueryBuilder('rentals')
      .innerJoinAndSelect('rentals.property', 'property')
      .where({ endDate: Not(IsNull()), startDate: Not(IsNull()) })
      .andWhere('property.propertyOwner = :id', { id })
      .getMany();

    return rentals;
  }

  async listLandLordReservedRentals(id: string): Promise<Rental[]> {
    const rentals = await this.repository
      .createQueryBuilder('rentals')
      .innerJoinAndSelect('rentals.property', 'property')
      .where({ startDate: IsNull() })
      .andWhere('property.propertyOwner = :id', { id })
      .andWhere('property.available = :available', { available: 'reserved' })
      .getMany();

    return rentals;
  }

  async listAllReservedRentals(): Promise<Rental[]> {
    const rentals = await this.repository
      .createQueryBuilder('rentals')
      .innerJoinAndSelect('rentals.property', 'property')
      .where({ startDate: IsNull() })
      .andWhere('property.available = :available', { available: 'reserved' })
      .getMany();

    return rentals;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id: id });
  }
}
