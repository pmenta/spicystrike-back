import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createConnection, getConnection } from 'typeorm';

import { AuthenticationService } from './AuthenticationService';
import { CreateUserService } from '@/services/User/CreateUserService';

import { User } from '@/entities/User';

require("dotenv").config()

beforeEach(async () => {
  await createConnection({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [User],
      synchronize: true,
      logging: false
  });
});

afterEach(() => {
  let conn = getConnection();
  return conn.close();
});

describe('Auth service', () => {
  const authenticationService = new AuthenticationService()
  const createUserService = new CreateUserService()

  it('should be able to auth', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      password: '123456',
    })

    const auth = await authenticationService.execute({ name: user.value.name, password: '123456' })

    expect(auth.value).toHaveProperty('token')
    expect(auth.value).toHaveProperty('id')
    expect(auth.value).toHaveProperty('name')
  })

  it('should not be able to login with an incorrect password', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      password: '123456',
    })

    const auth = await authenticationService.execute({ name: user.value.name, password: '123' })

    expect(auth.isLeft()).toBeTruthy()
    if (auth.isLeft()) {
      expect(auth.value).toBeInstanceOf(Error);
      expect(auth.value._message).toEqual('Nome ou senha inválidos')
    }
  })
})
