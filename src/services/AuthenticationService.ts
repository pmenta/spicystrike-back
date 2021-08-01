import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { sign } from "jsonwebtoken";

interface ILoginRequest {
  email: string;
  password: string;
}

class AuthenticationService {
  async execute({ email, password }: ILoginRequest) {
    const userRepository = await getCustomRepository(UsersRepository);

    if (!email || !password) {
      throw new Error("Invalid email or password");
    }

    const user = await userRepository.findOne({ email });

    const passwordMatch = compare(user.password, password);

    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    const token = sign({ email }, "f1bc4378de8f3380f52892b8475e542c", {
      subject: user.id,
      expiresIn: "1d",
    });

    return token;
  }
}

export { AuthenticationService };
