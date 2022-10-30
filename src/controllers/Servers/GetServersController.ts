import { Request, Response } from 'express';
import { GetServersService } from '@/services/Server/GetServersService';

class GetServersController {
  async handle(request: Request, response: Response) {
    const getServersService = new GetServersService();

    const servers = await getServersService.execute();

    return response.json(servers);
  }
}

export { GetServersController };
