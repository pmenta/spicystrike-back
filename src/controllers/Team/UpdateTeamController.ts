import { Request, Response } from 'express';
import { UpdateTeamService } from '../../services/Team/UpdateTeamService';

class UpdateTeamController {
  async handle(request: Request, response: Response) {
    const { id, name } = request.body;

    const createTeamService = new UpdateTeamService();

    const team = await createTeamService.execute({ id, name });

    return response.json(team);
  }
}

export { UpdateTeamController };
