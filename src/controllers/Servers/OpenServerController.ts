import { Request, Response } from 'express';
import { io } from '../../http';
import { OpenServerService } from '../../services/Server/OpenServerService';

class OpenServerController {
  async handle(request: Request, response: Response) {
    const { map_id, lobby_id } = request.body;
    const getServersService = new OpenServerService();

    const server = await getServersService.execute({ map_id });
    io.to(`lobby_${lobby_id}`).emit('server', server);

    return response.json(server);
  }
}

export { OpenServerController };
