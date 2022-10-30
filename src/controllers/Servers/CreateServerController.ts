import { Request, Response } from "express";
import { CreateServerService } from "@/services/Server/CreateServerService";

class CreateServerController {
  async handle(request: Request, response: Response) {
    const { hostname, ip, password, key_filename } = request.body;

    const createServerService = new CreateServerService();

    const server = await createServerService.execute({
      hostname,
      ip,
      password,
      key_filename,
    });

    if (server.isLeft()) {
      return response
        .status(server.value._statusCode)
        .json({ error: server.value._message });
    }

    return response.json({ ...server.value });
  }
}

export { CreateServerController };
