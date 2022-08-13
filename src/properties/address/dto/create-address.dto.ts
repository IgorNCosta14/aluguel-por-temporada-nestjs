export class CreateAddressDto {
  id?: number;
  zipCode: string;
  country: string;
  state: string;
  city: string;
  street?: string;
}
