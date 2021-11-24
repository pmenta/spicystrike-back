import { Request, Response } from 'express';
import { GetTeamByIdService } from '../../services/Team/GetTeamByIdService';

class GetTeamByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const getTeamByIdService = new GetTeamByIdService();

    const teams = await getTeamByIdService.execute({ id });

    return response.json(teams);
  }
}

export { GetTeamByIdController };
