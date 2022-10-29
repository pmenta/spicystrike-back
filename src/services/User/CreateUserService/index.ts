import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { Either, left, right } from '@/errors/either';
import { RequiredParametersError } from '@/errors/requiredParametersError';

import { UsersRepository } from '@/repositories/UsersRepository';
import { IPlainUser } from '@/entities/User';
import { classToPlain } from 'class-transformer';

interface ICreateUserRequest {
  name: string;
  password: string;
}

type ICreateUserResponse = IPlainUser;

type IResponse = Either<RequiredParametersError, ICreateUserResponse>

class CreateUserService {
  async execute({ name, password }: ICreateUserRequest): Promise<IResponse> {
    const usersRepository = await getCustomRepository(UsersRepository);

    if (!name) {
      return left(new RequiredParametersError('Nome é obrigatório', 400));
    }

    if (!password) {
      return left(new RequiredParametersError('Senha é obrigatório', 400));
    }

    const userAlreadyExists = await usersRepository.findOne({ name });

    if (userAlreadyExists) {
      return left(new RequiredParametersError('Já existe um usuário com esse nome', 400));
    }

    const hashPassword = await hash(password, 10)

    const user = usersRepository.create({
      name,
      password: hashPassword,
    });

    await usersRepository.save(user);

    const plainUser = classToPlain(user) as IPlainUser;

    return right({...plainUser});
  }
}

export { CreateUserService };
