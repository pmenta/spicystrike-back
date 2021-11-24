import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { UsersRepository } from '../../repositories/UsersRepository';
import { validateEmail } from '../../utils/validateEmail';

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: ICreateUserRequest) {
    const usersRepository = await getCustomRepository(UsersRepository);

    if (!name) {
      throw new Error('O nome é necessário');
    }

    if (!email) {
      throw new Error('O e-mail é necessário');
    }

    if (!password) {
      throw new Error('A senha é necessária');
    }

    const encryptedPassword = await hash(password, 8);
    const emailIsValid = validateEmail(email);

    if (!emailIsValid) {
      throw new Error('E-mail inválido');
    }

    const user = usersRepository.create({
      name,
      email,
      password: encryptedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
