import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createConnection, getConnection } from "typeorm";

import { AuthenticationService } from "@/services/Auth/AuthenticationService";
import { CreateUserService } from "@/services/User/CreateUserService";
import { UpdateUserService } from ".";

import { User } from "@/entities/User";

require("dotenv").config();

beforeEach(async () => {
  await createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [User],
    synchronize: true,
    logging: false,
  });
});

afterEach(() => {
  let conn = getConnection();
  return conn.close();
});

describe("Update user service", () => {
  const createUserService = new CreateUserService();
  const updateUserService = new UpdateUserService();
  const authenticationService = new AuthenticationService();

  it("should be able to update an user", async () => {
    const user = await createUserService.execute({
      name: "John Doe",
      password: "123456",
    });

    if (user.isRight()) {
      const updatedUser = await updateUserService.execute({
        id: user.value.id,
        name: "John Dae",
        password: "1234",
      });

      expect(updatedUser.value.name).toBe("John Dae");

      const auth = await authenticationService.execute({
        name: "John Dae",
        password: "1234",
      });

      expect(auth.isRight()).toBe(true);
    }
  });

  it("should not be able to update an user with a name that already exists", async () => {
    const user0 = await createUserService.execute({
      name: "John Doe",
      password: "123456",
    });

    const user1 = await createUserService.execute({
      name: "John Dae",
      password: "123456",
    });

    if (user0.isRight()) {
      const updatedUser = await updateUserService.execute({
        id: user0.value.id,
        name: "John Dae",
      });

      expect(updatedUser.isLeft()).toBe(true);
      if (updatedUser.isLeft()) {
        expect(updatedUser.value._statusCode).toBe(400);
        expect(updatedUser.value._message).toBe("Nome já existe");
      }
    }
  });

  it("should handle error if user does not exists", async () => {
    const updatedUser = await updateUserService.execute({
      id: "123",
      name: "John Dae",
    });

    expect(updatedUser.isLeft()).toBe(true);
    if (updatedUser.isLeft()) {
      expect(updatedUser.value._statusCode).toBe(404);
      expect(updatedUser.value._message).toBe("Usuário não encontrado");
    }
  });
});
