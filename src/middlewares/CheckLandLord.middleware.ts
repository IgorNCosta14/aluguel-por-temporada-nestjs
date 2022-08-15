import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CheckLandLordMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { id } = request.user;

    const user = await this.usersService.findById(id);

    if (
      user.permission.isLandlord === false &&
      user.permission.isAdmin === false
    ) {
      throw new Error("User isn't Landlord!");
    }

    return next();
  }
}
