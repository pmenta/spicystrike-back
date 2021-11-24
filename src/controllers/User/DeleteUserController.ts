import { Request, Response } from 'express';
import { DeleteUserService } from '../../services/User/DeleteUserService';

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;

    const deleteUserService = new DeleteUserService();

    await deleteUserService.execute(id);

    return response.json({ message: 'User deleted' });
  }
}

export { DeleteUserController };
