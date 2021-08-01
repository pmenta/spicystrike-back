import { Request, Response } from "express";
import { GetUsersService } from "../services/GetUsersService";

class GetUsersController {
  async handle(request: Request, response: Response) {
    const getUsersService = new GetUsersService();

    const users = await getUsersService.execute();

    return response.json(users);
  }
}

export { GetUsersController };
