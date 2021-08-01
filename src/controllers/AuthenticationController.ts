import { Request, Response } from "express";
import { AuthenticationService } from "../services/AuthenticationService";

class AuthenticationController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticationService = new AuthenticationService();

    const token = await authenticationService.execute({ email, password });

    return response.json(token);
  }
}

export { AuthenticationController };
