import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';
import { GetUsersService } from '../../services/User/GetUsersService';

class GetUsersController {
  async handle(request: Request, response: Response) {
    const getUsersService = new GetUsersService();

    const users = await getUsersService.execute();

    return response.json(classToPlain(users));
  }
}

export { GetUsersController };
