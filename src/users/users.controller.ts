import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
  async create(
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
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
