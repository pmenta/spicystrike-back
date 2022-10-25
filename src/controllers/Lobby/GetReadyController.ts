import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';

import { GetReadyService } from '../../services/Lobby/GetReadyService';

import { io } from '../../http';

class GetReadyController {
  async handle(request: Request, response: Response) {
    const { user_id } = request.body;
    const { id: lobby_id } = request.params;
    const getReadyService = new GetReadyService();

    const lobby = await getReadyService.execute({ user_id, lobby_id });
    io.to(`lobby_${lobby_id}`).emit('lobby', classToPlain(lobby));

    return response.json(classToPlain(lobby));
  }
}

export { GetReadyController };
