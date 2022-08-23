import { Injectable } from '@nestjs/common';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

dayjs.extend(utc);

@Injectable()
export class DateProviderService {
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compare(startDate: Date, endDate: Date): number {
    const endDateInUTC = this.convertToUTC(endDate);
    const startDateInUTC = this.convertToUTC(startDate);

    return dayjs(startDateInUTC).diff(endDateInUTC, 'day', true);
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }
}
