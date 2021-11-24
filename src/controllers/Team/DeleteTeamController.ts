import { Request, Response } from 'express';
import { DeleteTeamService } from '../../services/Team/DeleteTeamService';

class DeleteTeamController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;
    const user_id = request.userId;

    const deleteTeamService = new DeleteTeamService();

    await deleteTeamService.execute({ id, user_id });

    return response.json({ message: 'Team deleted' });
  }
}

export { DeleteTeamController };
