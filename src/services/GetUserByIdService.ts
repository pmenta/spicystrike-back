import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class GetUserByIdService {
    async execute(id: string) {
        const usersRepository = await getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id);

        return user;
    }
}

export { GetUserByIdService };
