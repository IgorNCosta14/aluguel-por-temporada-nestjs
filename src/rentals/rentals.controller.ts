import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { PropertiesService } from 'src/properties/properties.service';
import { DateProviderService } from 'src/utils/date-provider/date-provider.service';

@Controller('rentals')
export class RentalsController {
  constructor(
    private readonly rentalsService: RentalsService,
    private readonly propertiesService: PropertiesService,
    private readonly dateProvider: DateProviderService,
  ) {}

  @Post()
  async create(
    @Body()
    { propertyId, userId, expectedReturnDate }: CreateRentalDto,
  ) {
    const findProperty = await this.propertiesService.findById(propertyId);

    if (findProperty.available === false) {
      throw new Error('Property not available!');
    }

    const startDate = this.dateProvider.dateNow();
    const endDate = expectedReturnDate;

    const dateDifference = this.dateProvider.compare(endDate, startDate);

    if (dateDifference <= 0) {
      throw new Error('The return date cannot be less than the current date!');
    }

    const expectedTotalRate =
      Math.ceil(dateDifference) * findProperty.dailyRate;

    const rental = await this.rentalsService.create({
      propertyId,
      userId,
      expectedReturnDate,
      expectedTotalRate,
    });

    const available = false;
    const id = propertyId;

    await this.propertiesService.updateAvailableState({ id, available });

    return rental;
  }

  @Get()
  async findAll() {
    const rentals = await this.rentalsService.list();
    return rentals;
  }

  @Get('userrental')
  async findById(@Request() req) {
    const rental = await this.rentalsService.findRentalByUserId(req.user.id);

    if (rental.length === 0) {
      throw new Error('Rental not found!');
    }

    return rental;
  }

  @Get('finished')
  async listFinishedRentals() {
    const rentals = this.rentalsService.listFinishedRentals();

    return rentals;
  }

  @Get('inprogress')
  async listRentalsInProgress() {
    const rentals = this.rentalsService.listRentalsInProgress();

    return rentals;
  }

  @Patch('devolution/:id')
  async devolution(@Param('id') id: string) {
    const rental = await this.rentalsService.findById(id);

    if (rental.endDate != null || rental.totalRate != null) {
      throw new Error('Rent already finished!');
    }

    const property = await this.propertiesService.findById(rental.propertyId);

    rental.endDate = this.dateProvider.dateNow();

    const totalDaysRental = Math.ceil(
      this.dateProvider.compare(rental.endDate, rental.startDate),
    );

    const expectedDaysRental = Math.ceil(
      this.dateProvider.compare(rental.expectedReturnDate, rental.startDate),
    );

    if (rental.expectedReturnDate >= rental.endDate) {
      rental.totalRate = rental.expectedTotalRate;
    } else {
      rental.totalLateFee =
        (totalDaysRental - expectedDaysRental) * property.lateFee;

      rental.totalRate =
        expectedDaysRental * property.dailyRate + rental.totalLateFee;
    }

    await this.rentalsService.create(rental);

    const available = true;

    await this.propertiesService.updateAvailableState({
      id: rental.propertyId,
      available,
    });

    return rental;
  }

  @Patch('update/:id')
  async updateRental(
    @Body()
    {
      propertyId,
      userId,
      totalRate,
      startDate,
      expectedReturnDate,
      expectedTotalRate,
      endDate,
    }: UpdateRentalDto,
    @Param('id') id: string,
  ) {
    const rental = await this.rentalsService.findById(id);

    if (!rental) {
      throw new Error('Rental not found!');
    }

    if (propertyId) {
      rental.propertyId = propertyId;
    }

    if (userId) {
      rental.userId = userId;
    }

    if (startDate) {
      rental.startDate = startDate;
    }

    if (totalRate) {
      rental.totalRate = totalRate;
    }

    if (expectedTotalRate) {
      rental.expectedTotalRate = expectedTotalRate;
    }

    if (expectedReturnDate) {
      rental.expectedReturnDate = expectedReturnDate;
    }

    if (endDate) {
      rental.endDate = endDate;
    }

    await this.rentalsService.create(rental);

    return rental;
  }

  @Delete('delete/:id')
  async removeRental(@Param('id') id: string) {
    await this.rentalsService.delete(id);
  }
}
