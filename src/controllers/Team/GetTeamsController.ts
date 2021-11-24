import { Request, Response } from 'express';
import { GetTeamsService } from '../../services/Team/GetTeamsService';

class GetTeamsController {
  async handle(request: Request, response: Response) {
    const getTeamsService = new GetTeamsService();

    const teams = await getTeamsService.execute();

    return response.json(teams);
  }
}

export { GetTeamsController };
