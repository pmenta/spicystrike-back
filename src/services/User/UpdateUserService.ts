import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../../repositories/UsersRepository';

interface IUpdateUserRequest {
  id: string;
  name?: string;
  password?: string;
}

class UpdateUserService {
  async execute({
    name, password, id,
  }: IUpdateUserRequest) {
    const userRepository = await getCustomRepository(UsersRepository);

    let user = await userRepository.findOne(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (password) {
      const decryptedPassword = await hash(password, 8);

      user = {
        id: user.id,
        name: name || user.name,
        password: password ? decryptedPassword : password,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      await userRepository.save(user);
      return user;
    }

    user = {
      id: user.id,
      name: name || user.name,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    await userRepository.save(user);

    return user;
  }
}

export { UpdateUserService };
