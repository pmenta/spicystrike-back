import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { classToPlain } from 'class-transformer';
import { UsersRepository } from '../../repositories/UsersRepository';

interface ILoginRequest {
  name: string;
  password: string;
}

class AuthenticationService {
  async execute({ name, password }: ILoginRequest) {
    const userRepository = await getCustomRepository(UsersRepository);

    if (!name || !password) {
      throw new Error('Invalid name or password');
    }

    const user = await userRepository.findOne({ name });

    const passwordMatch = compare(user.password, password);

    if (!passwordMatch) {
      throw new Error('Invalid name or password');
    }

    const token = sign({ name }, 'f1bc4378de8f3380f52892b8475e542c', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { ...classToPlain(user), token };
  }
}

export { AuthenticationService };
