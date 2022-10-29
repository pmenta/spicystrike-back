import { getCustomRepository } from "typeorm";

import { Either, left, right } from "@/errors/either";
import { RequiredParametersError } from "@/errors/requiredParametersError";

import { UsersRepository } from "@/repositories/UsersRepository";

type IResponse = Either<RequiredParametersError, boolean>;

class DeleteUserService {
  async execute(id: string): Promise<IResponse> {
    const userRepository = await getCustomRepository(UsersRepository);

    if (!id) {
      return left(new RequiredParametersError("ID é obrigatório", 400));
    }

    const user = await userRepository.findOne(id);

    if (!user) {
      return left(new RequiredParametersError("Usuário não existe", 400));
    }

    await userRepository.remove(user);

    return right(true);
  }
}

export { DeleteUserService };
