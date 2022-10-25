import { Request, Response } from 'express';
import { classToPlain } from 'class-transformer';

import { GetLobbysService } from '../../services/Lobby/GetLobbysService';

class GetLobbysController {
  async handle(request: Request, response: Response) {
    const getLobbysService = new GetLobbysService();

    const lobbys = await getLobbysService.execute();

    return response.json(classToPlain(lobbys));
  }
}

export { GetLobbysController };
