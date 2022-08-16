import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UtilsService } from 'src/utils/utils.service';
import { compare, hash } from 'bcryptjs';
import { IRequest, IResponse } from './interfaces/authenticate-user.interface';
import { sign } from 'jsonwebtoken';

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

    if (emailAlreadyInUse) {
      throw new Error('Email already in use!');
    }

    if (this.utilsService.validateCPF(cpf) === false) {
      throw new Error('Invalid cpf!');
    }

    const cpfAlreadyRegistered = await this.usersService.findByCPF(cpf);

    if (cpfAlreadyRegistered) {
      throw new Error('CPF already registered!');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersService.create({
      name,
      cpf,
      email,
      password: passwordHash,
    });

    return user;
  }

  @Post('/sessions')
  async authenticate(
    @Body() { email, password }: IRequest,
  ): Promise<IResponse> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new Error('Email or password incorrect');
    }

    if (user.activeUser === false) {
      throw new Error('Inactive user!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email or password incorrect');
    }

    const token = sign({}, 'e3928a3bc4be46516aa33a79bbdfdb08', {
      subject: user.id,
      expiresIn: '5d',
    });

    const tokenResp: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return tokenResp;
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

  @Patch('/deactivatinguser/:id')
  async remove(@Param('id') id: string): Promise<void> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new Error('User not found!');
    }

    user.activeUser = false;

    await this.usersService.deactivatingUser(user);
  }
}
