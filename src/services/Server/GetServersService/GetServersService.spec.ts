import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { createConnection, getConnection } from "typeorm";

import { CreateServerService } from "@/services/Server/CreateServerService";

import { Server } from "@/entities/Server";
import { GetServersService } from ".";

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

describe("Get Servers service", () => {
  const createServerService = new CreateServerService();
  const getServersService = new GetServersService();

  it("should return 2 Servers", async () => {
    const Server0 = await createServerService.execute({
      hostname: "localhost",
      ip: "localhost",
      key_filename: "key.pem",
      password: "123",
    });

    const Server1 = await createServerService.execute({
      hostname: "localhost2",
      ip: "localhost",
      key_filename: "key.pem",
      password: "123",
    });

    const searchServers = await getServersService.execute();
    expect(searchServers).toEqual([Server0.value, Server1.value]);
  });
});
