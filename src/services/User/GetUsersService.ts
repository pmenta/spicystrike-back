import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../repositories/UsersRepository';

class GetUsersService {
  async execute() {
    const usersRepository = await getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }
}

export { GetUsersService };
