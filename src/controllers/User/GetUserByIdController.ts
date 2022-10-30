import { Request, Response } from "express";
import { GetUserByIdService } from "@/services/User/GetUserByIdService";

class GetUserByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const getUserByIdService = new GetUserByIdService();

    const user = await getUserByIdService.execute(id);

    if (user.isLeft()) {
      return response
        .status(user.value._statusCode)
        .json({ error: user.value._message });
    }

    return response.json({ ...user.value });
  }
}

export { GetUserByIdController };
