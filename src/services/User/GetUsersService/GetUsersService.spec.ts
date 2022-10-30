import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createConnection, getConnection } from "typeorm";

import { CreateUserService } from "../CreateUserService";

import { User } from "@/entities/User";
import { GetUsersService } from ".";

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

describe("Get users service", () => {
  const createUserService = new CreateUserService();
  const getUsersService = new GetUsersService();

  it("should return 2 users", async () => {
    const user0 = await createUserService.execute({
      name: "John Doe",
      password: "123456",
    });

    const user1 = await createUserService.execute({
      name: "John Dae",
      password: "123456",
    });

    const searchUsers = await getUsersService.execute();
    expect(searchUsers).toEqual([user0.value, user1.value]);
  });
});
