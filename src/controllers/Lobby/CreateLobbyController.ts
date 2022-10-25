import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';
import { CreateLobbyService } from '../../services/Lobby/CreateLobbyService';

import { io } from '../../http';

class CreateLobbyController {
  async handle(request: Request, response: Response) {
    const { gamemode, creator_id } = request.body;

    const createLobbyService = new CreateLobbyService();

    const lobby = await createLobbyService.execute({ gamemode, creator_id });
    io.to('lobbysRoom').emit('lobby', classToPlain(lobby));

    return response.json(classToPlain(lobby));
  }
}

export { CreateLobbyController };
