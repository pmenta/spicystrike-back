import { getCustomRepository } from 'typeorm';
import { MapsRepository } from '../../repositories/MapsRepository';

class DeleteMapService {
  async execute(id: string) {
    const mapsRepository = await getCustomRepository(MapsRepository);

    if (!id) {
      throw new Error('ID is required');
    }

    const map = await mapsRepository.findOne(id);

    if (!map) {
      throw new Error('Map does not exists');
    }

    await mapsRepository.remove(map);

    return true;
  }
}

export { DeleteMapService };
