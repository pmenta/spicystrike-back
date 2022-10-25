import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';
import { UpdateUserService } from '../../services/User/UpdateUserService';

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const {
      name, password,
    } = request.body;
    const id = request.userId;

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({
      id, name, password,
    });

    return response.json(classToPlain(user));
  }
}

export { UpdateUserController };
