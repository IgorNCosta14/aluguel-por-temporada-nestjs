import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePermissionDTO } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  async createPermission(
    @Body() { name, isLandlord, isAdmin }: CreatePermissionDTO,
  ): Promise<Permission> {
    const permissionAlreadyExists = await this.permissionsService.findByName(
      name,
    );

    if (permissionAlreadyExists) {
      throw new Error('Permission name already in use!');
    }

    const permission = await this.permissionsService.create({
      name,
      isLandlord,
      isAdmin,
    });

    return permission;
  }

  @Get()
  async listPermission(): Promise<Permission[]> {
    const permissions = await this.permissionsService.list();

    return permissions;
  }
}
