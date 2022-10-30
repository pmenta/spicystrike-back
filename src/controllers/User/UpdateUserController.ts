import { Request, Response } from "express";
import { UpdateUserService } from "@/services/User/UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { name, password } = request.body;
    const id = request.userId;

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({
      id,
      name,
      password,
    });

    if (user.isLeft()) {
      return response
        .status(user.value._statusCode)
        .json({ error: user.value._message });
    }

    return response.json({ ...user.value });
  }
}

export { UpdateUserController };
