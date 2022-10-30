import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createConnection, getConnection } from "typeorm";

import { CreateServerService } from ".";

import { Server } from "@/entities/Server";

require("dotenv").config();

beforeEach(async () => {
  await createConnection({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [Server],
    synchronize: true,
    logging: false,
  });
});

afterEach(() => {
  let conn = getConnection();
  return conn.close();
});

describe("Create server service", () => {
  const createServerService = new CreateServerService();

  it("should be able to create an server", async () => {
    const server = await createServerService.execute({
      hostname: "localhost",
      ip: "localhost",
      key_filename: "key.pem",
      password: "123",
    });

    expect(server.isRight()).toBe(true);
    expect(server.value).toHaveProperty("hostname");
    expect(server.value).toHaveProperty("ip");
    expect(server.value).toHaveProperty("key_filename");
    expect(server.value).toHaveProperty("password");
    expect(server.value).toHaveProperty("status");
  });

  it("should not be able to create an server with same hostname", async () => {
    const server0 = await createServerService.execute({
      hostname: "localhost",
      ip: "localhost",
      key_filename: "key.pem",
      password: "123",
    });

    const server1 = await createServerService.execute({
      hostname: "localhost",
      ip: "localhost",
      key_filename: "key.pem",
      password: "123",
    });

    expect(server1.isLeft()).toBe(true);
    if (server1.isLeft()) {
      expect(server1.value._statusCode).toBe(400);
      expect(server1.value.message).toBe("Servidor já cadastrado");
    }
  });

  it("should not be able to create an server with missing parameters", async () => {
    const server = await createServerService.execute({
      hostname: "",
      ip: null,
      key_filename: "",
      password: "",
    });

    expect(server.isLeft()).toBe(true);
    if (server.isLeft()) {
      expect(server.value._statusCode).toBe(400);
      expect(server.value.message).toBe("Verifique os dados necessários");
    }
  });
});
