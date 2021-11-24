import { Request, Response } from 'express';
import { CreateTeamService } from '../../services/Team/CreateTeamService';

class CreateTeamController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;
    const founder_id = request.userId;

    const createTeamService = new CreateTeamService();

    const team = await createTeamService.execute({ name, founder_id });

    return response.json(team);
  }
}

export { CreateTeamController };
