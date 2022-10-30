import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";

import { UsersRepository } from "@/repositories/UsersRepository";

import { IPlainUser } from "@/entities/User";

class GetUsersService {
  async execute(): Promise<IPlainUser[]> {
    const usersRepository = await getCustomRepository(UsersRepository);

    const users = await usersRepository.find();
    const plainUsers = classToPlain(users) as IPlainUser[];

    return plainUsers;
  }
}

export { GetUsersService };
