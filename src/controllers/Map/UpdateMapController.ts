import { Request, Response } from 'express';
import { UpdateMapService } from '../../services/Map/UpdateMapService';

class UpdateMapController {
  async handle(request: Request, response: Response) {
    const {
      name,
    } = request.body;
    const id = request.mapId;

    const updateMapService = new UpdateMapService();

    const map = await updateMapService.execute({
      id, name,
    });

    return response.json(map);
  }
}

export { UpdateMapController };
