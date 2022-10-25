import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { LobbysRepository } from '../../repositories/LobbysRepository';
import { UsersRepository } from '../../repositories/UsersRepository';

interface ICreateLobbyRequest {
  gamemode: 'competitive' | 'x1'
  creator_id: string
}

class CreateLobbyService {
  async execute({
    gamemode, creator_id,
  }: ICreateLobbyRequest) {
    const lobbysRepository = await getCustomRepository(LobbysRepository);
    const usersRepository = await getCustomRepository(UsersRepository);

    if (!gamemode) {
      throw new Error('O modo do lobby é necessário');
    }

    const creator = await usersRepository.findOne({ id: creator_id });
    if (!creator) {
      throw new Error('Este usuário não existe');
    }

    const ifCreatorAlreadyOwnsALobby = await lobbysRepository.findOne({ created_by: creator_id });

    if (ifCreatorAlreadyOwnsALobby) {
      throw new Error('Este usuário já possui um lobby');
    }

    const lobbyObj = {
      status: 0,
      team: [classToPlain(creator)],
      enemy_team: [],
      vetoes: [],
      ready: [],
      gamemode,
      map: undefined,
      created_by: creator.id,
    };

    const lobby = lobbysRepository.create(lobbyObj);

    await lobbysRepository.save(lobby);

    return { ...lobby, creator };
  }
}

export { CreateLobbyService };
