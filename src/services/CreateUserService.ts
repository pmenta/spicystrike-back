import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { validateEmail } from "../utils/validateEmail";
import { hash } from "bcryptjs";

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: ICreateUserRequest) {
    const usersRepository = await getCustomRepository(UsersRepository);

    if (!name) {
      throw new Error("Name is required");
    }

    if (!email) {
      throw new Error("Email is required");
    }

    if (!password) {
      throw new Error("Password is required");
    }

    const encryptedPassword = await hash(password, 8);
    const emailIsValid = validateEmail(email);

    if (!emailIsValid) {
      throw new Error("Invalid e-mail");
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
