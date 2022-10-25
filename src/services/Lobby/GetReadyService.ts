import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { LobbysRepository } from '../../repositories/LobbysRepository';
import { UsersRepository } from '../../repositories/UsersRepository';

interface IGetReadyRequest {
  user_id: string,
  lobby_id: string,
}

class GetReadyService {
  async execute({ user_id, lobby_id }: IGetReadyRequest) {
    const lobbyRepository = await getCustomRepository(LobbysRepository);
    const usersRepository = await getCustomRepository(UsersRepository);

    if (!user_id) {
      throw new Error('O ID do usuário não foi informado');
    }

    if (!lobby_id) {
      throw new Error('O ID do lobby não foi informado');
    }

    const lobby = await lobbyRepository.findOne(lobby_id, { relations: ['creator'] });

    if (!lobby) {
      throw new Error('Lobby não encontrado');
    }

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const newLobby = {e
      ...lobby,
      ready: [...lobby.ready, { id: user_id, ready: true }],
    };

    const allPlayers = [...lobby.enemy_team, ...lobby.team];
    const allPlayersReady = newLobby.ready.length === allPlayers.length;

    if (allPlayersReady) {
      await lobbyRepository.save({ ...newLobby, status: 2 });

      return classToPlain({ ...newLobby, status: 2 });
    }
    await lobbyRepository.save(newLobby);

    return classToPlain(newLobby);
  }
}

export { GetReadyService };
