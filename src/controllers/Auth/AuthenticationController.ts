import { Request, Response } from 'express';
import { AuthenticationService } from '@/services/Auth/AuthenticationService';

class AuthenticationController {
  async handle(request: Request, response: Response) {
    const { name, password } = request.body;

    const authenticationService = new AuthenticationService();

    const user = await authenticationService.execute({ name, password });

    if(user.isLeft()) {
      return response.status(user.value._statusCode).json({ error: user.value._message });
    }

    return response.json({ ...user.value });
  }
}

export { AuthenticationController };
