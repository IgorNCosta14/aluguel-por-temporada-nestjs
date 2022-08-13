import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDTO } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private repository: Repository<Permission>,
  ) {}

  async create({
    name,
    isLandlord,
    isAdmin,
    createdAt,
  }: CreatePermissionDTO): Promise<Permission> {
    const permission = this.repository.create({
      name,
      isLandlord,
      isAdmin,
      createdAt,
    });

    await this.repository.save(permission);

    return permission;
  }

  async list(): Promise<Permission[]> {
    const permissions = await this.repository.find();

    return permissions;
  }

  async findByName(name: string): Promise<Permission> {
    const permission = await this.repository.findOne({ where: { name } });

    return permission;
  }

  async findById(id: number): Promise<Permission> {
    const permission = await this.repository.findOne({ where: { id } });

    return permission;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}
