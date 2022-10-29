import { Request, Response } from "express";
import { DeleteUserService } from "../../services/User/DeleteUserService";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.body;

    const deleteUserService = new DeleteUserService();

    const deleted = await deleteUserService.execute(id);

    if (deleted.isLeft()) {
      return response.status(deleted.value._statusCode).json({ error: deleted.value._message });
    }

    return response.json({ message: "User deleted" });
  }
}

export { DeleteUserController };
