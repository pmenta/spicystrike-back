import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createConnection, getConnection } from "typeorm";

import { CreateUserService } from "../CreateUserService";

import { User } from "@/entities/User";
import { GetUserByIdService } from ".";

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

describe("Get user by ID service", () => {
  const createUserService = new CreateUserService();
  const getUserByIdService = new GetUserByIdService();

  it("should return a user", async () => {
    const user = await createUserService.execute({
      name: "John Doe",
      password: "123456",
    });

    if (user.isRight()) {
      const searchUser = await getUserByIdService.execute(user.value.id);

      if (searchUser.isRight()) {
        expect(searchUser.value).toEqual(user.value);
      }
    }
  });

  it("should return an error if the user does not exist", async () => {
    const searchUser = await getUserByIdService.execute("123");

    if (searchUser.isLeft()) {
      expect(searchUser.value._message).toEqual("Usuário não encontrado");
    }
  });

  it("should return an error if the id is not provided", async () => {
    const searchUser = await getUserByIdService.execute(null);

    if (searchUser.isLeft()) {
      expect(searchUser.value._message).toEqual("Id é obrigatório");
    }
  });
});
