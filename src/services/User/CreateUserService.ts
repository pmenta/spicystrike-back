import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { UsersRepository } from '@/repositories/UsersRepository';

interface ICreateUserRequest {
  name: string;
  password: string;
}

class CreateUserService {
  async execute({ name, password }: ICreateUserRequest) {
    const usersRepository = await getCustomRepository(UsersRepository);

    if (!name) {
      throw new Error('O nome é necessário');
    }

    if (!password) {
      throw new Error('A senha é necessária');
    }

    const userAlreadyExists = await usersRepository.findOne({ name });

    if (userAlreadyExists) {
      throw new Error('Já existe um usuário com esse nome');
    }

    const hashPassword = await hash(password, 10)

    const user = usersRepository.create({
      name,
      password: hashPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
