import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return {
      id: '0b359c01-ac97-444a-9ebe-9405527812bd',
      userPermission: 1,
      activeUser: true,
      name: createUserDto.name,
      cpf: createUserDto.cpf,
      email: createUserDto.email,
      password: createUserDto.password,
      createdAt: new Date(),
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
