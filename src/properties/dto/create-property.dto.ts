import { AvailableStatus, PropertyType } from '../entities/property.entity';

export class CreatePropertyDto {
  id?: string;
  propertyName: string;
  description: string;
  propertyOwner?: string;
  propertyAddressId?: number;
  propertyNumber: string;
  propertyType: PropertyType;
  available?: AvailableStatus;
  dailyRate: number;
  createdAt?: Date;
  updatedAt?: Date;
  zipCode?: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  lateFee?: number;
}
