import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class DeleteUserService {
  async execute(id: string) {
    const userRepository = await getCustomRepository(UsersRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new Error("User does not exists");
    }

    await userRepository.remove(user);

    return true;
  }
}

export { DeleteUserService };
