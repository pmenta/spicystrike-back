import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';

import { io } from '../../http';

import { EnterInX1LobbyService } from '../../services/Lobby/EnterInX1LobbyService';

class EnterInX1LobbyController {
  async handle(request: Request, response: Response) {
    const { user_id } = request.body;
    const { id: lobby_id } = request.params;

    const enterInX1LobbyService = new EnterInX1LobbyService();

    const lobby = await enterInX1LobbyService.execute({ user_id, lobby_id });

    io.to('lobbysRoom').emit('lobby', lobby);
    io.to(`lobby_${lobby_id}`).emit('lobby', lobby);

    return response.json(classToPlain(lobby));
  }
}

export { EnterInX1LobbyController };
