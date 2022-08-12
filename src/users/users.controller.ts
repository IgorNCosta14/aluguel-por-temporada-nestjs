import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UtilsService } from 'src/utils/utils.service';
import { hash } from 'bcryptjs';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService,
  ) {}

  @Post()
  async createUser(
    @Body() { name, cpf, email, password }: CreateUserDto,
  ): Promise<User> {
    if (this.utilsService.validateEmail(email) === false) {
      throw new Error('Invalid email!');
    }

    const emailAlreadyInUse = await this.usersService.findByEmail(email);

    // if (emailAlreadyInUse) {
    //   throw new Error('Email already in use!');
    // }

    if (this.utilsService.validateCPF(cpf) === false) {
      throw new Error('Invalid cpf!');
    }

    const cpfAlreadyRegistered = await this.usersService.findByCPF(cpf);

    // if (cpfAlreadyRegistered) {
    //   throw new Error('CPF already registered!');
    // }

    const passwordHash = await hash(password, 8);

    const user = await this.usersService.create({
      name,
      cpf,
      email,
      password: passwordHash,
    });

    return user;
  }

  @Get()
  async listUsers(): Promise<User[]> {
    const users = await this.usersService.list();

    return users;
  }

  @Get('/find')
  async findOne(@Query('name') name: string): Promise<User[]> {
    const users = await this.usersService.findByName(name);

    if (users.length === 0) {
      throw new Error('No user found with this name!');
    }

    return users;
  }

  @Patch('/tolandlord/:id')
  async update(@Param('id') id: string): Promise<void> {
    const user = await this.usersService.findById(id);

    if (user.userPermission > 1) {
      throw new Error('User already is landlord or admin!');
    }

    await this.usersService.updateToLandLord(id);
  }

  @Delete('/deactivatinguser/:id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new Error('User not found!');
    }

    user.activeUser = false;

    await this.usersService.deactivatingUser(user);
  }
}
