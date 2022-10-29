import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { classToPlain } from 'class-transformer';

import { UsersRepository } from '@/repositories/UsersRepository';
import { Either, left, right } from '@/errors/either';
import { RequiredParametersError } from '@/errors/requiredParametersError';
import { IPlainUser } from '@/entities/User';

interface ILoginRequest {
  name: string;
  password: string;
}

type ILoginResponse = IPlainUser & { token: string };

type IResponse = Either<RequiredParametersError, ILoginResponse>

class AuthenticationService {
  async execute({ name, password }: ILoginRequest): Promise<IResponse> {
    const userRepository = await getCustomRepository(UsersRepository);

    if (!name || !password) {
      return left(new RequiredParametersError('Nome e senha são obrigatórios', 400));
    }

    const user = await userRepository.findOne({ name });
    
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return left(new RequiredParametersError('Nome ou senha inválidos', 401));
    }

    const token = sign({ name }, process.env.SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });

    const plainUser = classToPlain(user) as IPlainUser;

    return right({ ...plainUser, token })
  }
}

export { AuthenticationService };
