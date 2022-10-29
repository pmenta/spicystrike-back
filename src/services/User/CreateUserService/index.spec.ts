import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createConnection, getConnection } from "typeorm";

import { CreateUserService } from ".";

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

describe("Create user service", () => {
  const createUserService = new CreateUserService();

  it("should be create an user", async () => {
    const user = await createUserService.execute({
      name: "John Doe",
      password: "123456",
    });

    expect(user.isRight()).toBe(true);
    expect(user.value).toHaveProperty("id");
    expect(user.value).toHaveProperty("name");
    expect(user.value).not.toHaveProperty("password");
  });

  it("should not be create an user with same name", async () => {
    await createUserService.execute({
      name: "John Doe",
      password: "123456",
    });

    const user = await createUserService.execute({
      name: "John Doe",
      password: "123456",
    });

    expect(user.isLeft()).toBe(true);
    if(user.isLeft()) {
      expect(user.value).toBeInstanceOf(Error);
      expect(user.value.message).toBe("Já existe um usuário com esse nome");
    }
  });
});
