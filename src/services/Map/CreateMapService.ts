import { getCustomRepository } from 'typeorm';
import { MapsRepository } from '../../repositories/MapsRepository';

interface ICreateMapRequest {
  name: string;
}

class CreateMapService {
  async execute({ name }: ICreateMapRequest) {
    const mapsRepository = await getCustomRepository(MapsRepository);
    const mapAlreadyExists = await mapsRepository.findOne({ name });

    if (!name) {
      throw new Error('O nome do mapa é necessário');
    }

    if (mapAlreadyExists) {
      throw new Error('Este mapa já existe');
    }

    const map = mapsRepository.create({
      name,
    });

    await mapsRepository.save(map);

    return map;
  }
}

export { CreateMapService };
