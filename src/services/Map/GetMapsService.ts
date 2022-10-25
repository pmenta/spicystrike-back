import { getCustomRepository } from 'typeorm';
import { MapsRepository } from '../../repositories/MapsRepository';

class GetMapsService {
  async execute() {
    const mapsRepository = await getCustomRepository(MapsRepository);

    const maps = await mapsRepository.find();

    return maps;
  }
}

export { GetMapsService };
