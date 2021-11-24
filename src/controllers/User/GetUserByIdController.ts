import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';
import { GetUserByIdService } from '../../services/User/GetUserByIdService';

class GetUserByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const getUserByIdService = new GetUserByIdService();

    const user = await getUserByIdService.execute(id);

    return response.json(classToPlain(user));
  }
}

export { GetUserByIdController };
