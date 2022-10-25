import { Request, Response } from 'express';
import { DeleteMapService } from '../../services/Map/DeleteMapService';

class DeleteMapController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;

    const deleteMapService = new DeleteMapService();

    await deleteMapService.execute(id);

    return response.json({ message: 'Map deleted' });
  }
}

export { DeleteMapController };
