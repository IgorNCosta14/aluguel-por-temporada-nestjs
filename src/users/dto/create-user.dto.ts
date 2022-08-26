export class CreateUserDto {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  userPermission?: number;
  activeUser?: boolean;
  createdAt?: Date;
}
