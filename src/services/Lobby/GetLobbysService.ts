import { getCustomRepository } from 'typeorm';
import { LobbysRepository } from '../../repositories/LobbysRepository';

class GetLobbysService {
  async execute() {
    const lobbysRepository = await getCustomRepository(LobbysRepository);

    const lobbys = await lobbysRepository.find({ where: { status: 0 }, relations: ['creator'] });

    return lobbys;
  }
}

export { GetLobbysService };
