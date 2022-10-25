import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { CreateUserService } from '../../services/User/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, password });

    return response.json(classToPlain(user));
  }
}

export { CreateUserController };
