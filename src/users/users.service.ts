import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async create({
    id,
    name,
    cpf,
    email,
    password,
  }: CreateUserDto): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      cpf,
      email,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  async list(): Promise<User[]> {
    const users = await this.repository
      .find
      //   {
      //   relations: ["permission"]
      // }
      ();

    return users;
  }

  async findByEmail(email: string) {
    return `This action returns a #${email} user`;
  }

  async findByCPF(cpf: string) {
    return `This action returns a #${cpf} user`;
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
