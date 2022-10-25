import { getCustomRepository } from 'typeorm';
import { LobbysRepository } from '../../repositories/LobbysRepository';

interface IGetLobbyByIdRequest {
  id: string
}

class GetLobbyByIdService {
  async execute({ id }: IGetLobbyByIdRequest) {
    const lobbysRepository = await getCustomRepository(LobbysRepository);

    const lobby = await lobbysRepository.findOne({ where: { id }, relations: ['creator'] });

    return lobby;
  }
}

export { GetLobbyByIdService };
