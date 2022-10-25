import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';

import { GetLobbyByIdService } from '../../services/Lobby/GetLobbyByIdService';

class GetLobbyByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const getLobbysService = new GetLobbyByIdService();

    const lobby = await getLobbysService.execute({ id });

    return response.json(classToPlain(lobby));
  }
}

export { GetLobbyByIdController };
