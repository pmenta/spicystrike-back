import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';
import { VetoMapService } from '../../services/Vetoes/VetoMapService';

import { io } from '../../http';

class VetoMapController {
  async handle(request: Request, response: Response) {
    const { map_id } = request.body;
    const { id: lobby_id } = request.params;

    const vetoMapService = new VetoMapService();

    const lobby = await vetoMapService.execute({ map_id, lobby_id });
    io.to(`lobby_${lobby_id}`).emit('lobby', classToPlain(lobby));

    return response.json(classToPlain(lobby));
  }
}

export { VetoMapController };
