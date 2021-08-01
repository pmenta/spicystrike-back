import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { validateEmail } from "../utils/validateEmail";

interface IUpdateUserRequest {
  id: string;
  name?: string;
  password?: string;
  email?: string;
}

class UpdateUserService {
  async execute({ name, password, email, id }: IUpdateUserRequest) {
    const userRepository = await getCustomRepository(UsersRepository);

    let user = await userRepository.findOne(id);

    if (email) {
      const emailIsValid = validateEmail(email);

      if (!emailIsValid) {
        throw new Error("Invalid e-mail");
      }
    }

    if (password) {
      const decryptedPassword = await hash(password, 8);

      user = {
        id: user.id,
        name: name ? name : user.name,
        email: email ? email : user.email,
        password: password ? decryptedPassword : password,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };

      await userRepository.save(user);

      return user;
    }

    user = {
      id: user.id,
      name: name ? name : user.name,
      email: email ? email : user.email,
      password: user.password,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    await userRepository.save(user);

    return user;
  }
}

export { UpdateUserService };
