import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";

import { Either, left, right } from "@/errors/either";
import { RequiredParametersError } from "@/errors/requiredParametersError";

import { UsersRepository } from "@/repositories/UsersRepository";

import { IPlainUser } from "@/entities/User";
import { classToPlain } from "class-transformer";

interface IUpdateUserRequest {
  id: string;
  name?: string;
  password?: string;
}

type ICreateUserResponse = IPlainUser;

type IResponse = Either<RequiredParametersError, ICreateUserResponse>;

class UpdateUserService {
  async execute({
    name,
    password,
    id,
  }: IUpdateUserRequest): Promise<IResponse> {
    const userRepository = await getCustomRepository(UsersRepository);

    if (!id) {
      return left(new RequiredParametersError("Id é obrigatório", 400));
    }

    let user = await userRepository.findOne(id);

    const nameAlreadyExists = await userRepository.findOne({ name });

    if (nameAlreadyExists) {
      if (nameAlreadyExists.id !== user.id) {
        return left(new RequiredParametersError("Nome já existe", 400));
      }
    }

    if (!user) {
      return left(new RequiredParametersError("Usuário não encontrado", 404));
    }

    if (password) {
      const hashPassword = await hash(password, 10);

      user = {
        id: user.id,
        name: name || user.name,
        password: password ? hashPassword : password,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      await userRepository.save(user);
      const plainUser = classToPlain(user) as IPlainUser;

      return right(plainUser);
    }

    user = {
      id: user.id,
      name: name || user.name,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    await userRepository.save(user);
    const plainUser = classToPlain(user) as IPlainUser;

    return right(plainUser);
  }
}

export { UpdateUserService };
