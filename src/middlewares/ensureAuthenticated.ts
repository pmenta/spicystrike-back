import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  // Receber token
  const token = request.headers.authorization;

  // Validar se token está preenchido
  if (!token) {
    return response.status(401).end();
  }

  // Validar token
  try {
    const { sub } = verify(
      token.substring(7),
      process.env.SECRET,
    ) as IPayload;

    // Inserir userId na request
    request.userId = sub;
  } catch {
    return response.status(401).end();
  }

  return next();
}
