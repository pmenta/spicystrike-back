import { Request, Response } from "express";
import { GetUserByIdService } from "../services/GetUserByIdService";

class GetUserByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params
        const getUserByIdService = new GetUserByIdService();

        const users = await getUserByIdService.execute(id);

        return response.json(users);
    }
}

export { GetUserByIdController };
