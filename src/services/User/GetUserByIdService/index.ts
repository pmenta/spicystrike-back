import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";

import { Either, left, right } from "@/errors/either";
import { RequiredParametersError } from "@/errors/requiredParametersError";

import { UsersRepository } from "@/repositories/UsersRepository";
import { IPlainUser } from "@/entities/User";

type IGetUserByIdResponse = IPlainUser;
type IResponse = Either<RequiredParametersError, IGetUserByIdResponse>;

class GetUserByIdService {
  async execute(id: string): Promise<IResponse> {
    const usersRepository = await getCustomRepository(UsersRepository);

    if (!id) {
      return left(new RequiredParametersError("Id é obrigatório", 400));
    }

    const user = await usersRepository.findOne({ where: { id } });

    if (!user) {
      return left(new RequiredParametersError("Usuário não encontrado", 404));
    }

    const plainUser = classToPlain(user) as IPlainUser;

    return right(plainUser);
  }
}

export { GetUserByIdService };
