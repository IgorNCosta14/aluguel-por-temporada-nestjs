export class CreatePropertyDto {
  id?: string;
  propertyName: string;
  description: string;
  propertyOwner?: string;
  propertyAddressId?: number;
  propertyNumber: string;
  typeProperty: string;
  available?: boolean;
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
