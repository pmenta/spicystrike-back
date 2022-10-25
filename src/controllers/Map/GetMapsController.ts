import { Request, Response } from 'express';
import { GetMapsService } from '../../services/Map/GetMapsService';

class GetMapsController {
  async handle(request: Request, response: Response) {
    const getMapsService = new GetMapsService();

    const maps = await getMapsService.execute();

    return response.json(maps);
  }
}

export { GetMapsController };
