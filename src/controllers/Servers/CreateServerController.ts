import { Request, Response } from 'express';
import { CreateServerService } from '../../services/Server/CreateServerService';

class CreateServerController {
  async handle(request: Request, response: Response) {
    const {
      hostname, ip, password, key_filename,
    } = request.body;

    const createServerService = new CreateServerService();

    const server = await createServerService.execute({
      hostname, ip, password, key_filename,
    });

    return response.json(server);
  }
}

export { CreateServerController };
