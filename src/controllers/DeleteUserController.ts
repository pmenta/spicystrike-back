import { Request, Response } from "express";
import { DeleteUserService } from "../services/DeleteUserService";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;
    
    const deleteUserService = new DeleteUserService();

    const result = await deleteUserService.execute(id);

    return response.json({ message: "User deleted" });
  }
}

export { DeleteUserController };
