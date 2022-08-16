import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

interface IPayload {
  sub: string;
}

@Injectable()
export class CheckAuthenticatesMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error('Token missing');
    }

    const [, token] = authHeader.split(' ');

    try {
      const { sub: userId } = verify(
        token,
        'e3928a3bc4be46516aa33a79bbdfdb08',
      ) as IPayload;

      const user = await this.usersService.findById(userId);

      if (!user) {
        throw new Error('User does not exists!');
      }

      if (user.activeUser === false) {
        throw new Error('Inactive user!');
      }

      request.user = {
        id: userId,
      };

      next();
    } catch {
      throw new Error('Invalid token');
    }
  }
}