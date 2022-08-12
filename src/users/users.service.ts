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
    const users = await this.repository.find();
    //   {
    //   relations: ["permission"]
    // }
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ where: { email } });

    return user;
  }

  async findByCPF(cpf: string): Promise<User> {
    const user = await this.repository.findOne({ where: { cpf } });

    return user;
  }

  async findByName(name: string): Promise<User[]> {
    const users = await this.repository.find({ where: { name } });

    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { id } /*relations: ["permission"]*/,
    });

    return user;
  }

  async updateToLandLord(id: string): Promise<void> {
    const user = await this.repository.findOne({ where: { id } });

    user.userPermission = 2;

    await this.repository.save(user);
  }

  async deactivatingUser(data: User): Promise<void> {
    await this.repository.save(data);
  }
}
