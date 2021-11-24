import { Request, Response } from 'express';
import { AuthenticationService } from '../../services/Auth/AuthenticationService';

class AuthenticationController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticationService = new AuthenticationService();

    const user = await authenticationService.execute({ email, password });

    return response.json({ user });
  }
}

export { AuthenticationController };