import { Request, Response } from 'express';
import { CreateUserService } from '@/services/User/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, password });

    if(user.isLeft()) {
      return response.status(user.value._statusCode).json({error: user.value.message});
    }

    return response.json({ ...user.value });
  }
}

export { CreateUserController };
