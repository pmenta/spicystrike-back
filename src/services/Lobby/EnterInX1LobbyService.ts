import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { LobbysRepository } from '../../repositories/LobbysRepository';
import { UsersRepository } from '../../repositories/UsersRepository';

interface IEnterInX1LobbyRequest {
  user_id: string,
  lobby_id: string,
}

class EnterInX1LobbyService {
  async execute({ user_id, lobby_id }: IEnterInX1LobbyRequest) {
    const lobbyRepository = await getCustomRepository(LobbysRepository);
    const usersRepository = await getCustomRepository(UsersRepository);

    if (!user_id) {
      throw new Error('O ID do usuário não foi informado');
    }

    if (!lobby_id) {
      throw new Error('O ID do lobby não foi informado');
    }

    const lobby = await lobbyRepository.findOne({ where: { id: lobby_id }, relations: ['creator'] });

    if (!lobby) {
      throw new Error('Lobby não encontrado');
    }

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const newLobby = {
      ...lobby,
      enemy_team: [classToPlain(user)],
      status: 1,
    };

    await lobbyRepository.save(newLobby);

    return classToPlain(newLobby);
  }
}

export { EnterInX1LobbyService };
