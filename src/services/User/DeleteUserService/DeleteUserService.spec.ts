import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createConnection, getConnection } from "typeorm";

import { DeleteUserService } from ".";

import { User } from "@/entities/User";
import { CreateUserService } from "../CreateUserService";

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

describe("Delete user service", () => {
  const createUserService = new CreateUserService();
  const deleteUserService = new DeleteUserService();

  it("should delete a user", async () => {
    const user = await createUserService.execute({
      name: "John Doe",
      password: "12345",
    });

    if (user.isRight()) {
      const deleted = await deleteUserService.execute(user.value.id);

      expect(deleted.isRight()).toBe(true);
      expect(deleted.value).toBe(true);

      const searchAfterDelete = await deleteUserService.execute(user.value.id);
      expect(searchAfterDelete.isLeft()).toBe(true);

      if (searchAfterDelete.isLeft()) {
        expect(searchAfterDelete.value).toBeInstanceOf(Error);
        expect(searchAfterDelete.value.message).toBe("Usuário não existe");
      }
    }
  });

  it("should not delete a user with invalid id", async () => {
    const deleted = await deleteUserService.execute("invalid-id");

    expect(deleted.isLeft()).toBe(true);
    if (deleted.isLeft()) {
      expect(deleted.value).toBeInstanceOf(Error);
      expect(deleted.value.message).toBe("Usuário não existe");
    }
  });
});
