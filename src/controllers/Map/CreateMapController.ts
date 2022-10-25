import { Request, Response } from 'express';
import { CreateMapService } from '../../services/Map/CreateMapService';

class CreateMapController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createMapService = new CreateMapService();

    const map = await createMapService.execute({ name });

    return response.json(map);
  }
}

export { CreateMapController };
